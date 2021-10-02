import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StudysetCard from "./StudysetCard";
import SideLogo from "../photos/logo-only.png";
import { useSelector } from "react-redux";
import { selectUser } from "./user/userSlice";

import { Popup, Form, Button, Input, Segment, Icon } from "semantic-ui-react";
import Switch from "@mui/material/Switch";
import { motion } from "framer-motion";



function StudysetsContainer({ onlyMine, reviewsets, setReviewsets }) {
  const user = useSelector(selectUser);

  const [errors, setErrors] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false); //Edit Button click
  const [studysetsData, setStudysetsData] = useState([]); //My Studyset data
  const [studysetValue, setStudysetValue] = useState({
    title: "",
    description: "",
    id: "",
  });
  const [sortedStudyset, setSortedStudyset] = useState(false);
  const [search, setSearch] = useState("");

  const handleSort = () => {
    setSortedStudyset(!sortedStudyset);
  };

  useEffect(() => {
    let url;
    if (onlyMine) {
      url = sortedStudyset ? "/my-ordered-studysets" : "/my_studysets";
    } else {
      url = sortedStudyset ? "/ordered-studysets" : "/studysets";
    }

    fetch(url).then((r) => {
      if (r.ok) {
        r.json().then((data) => setStudysetsData(data));
      }
    });
  }, [sortedStudyset]);

  const handleDelete = (id) => {
    fetch(`/my_studysets/${id}`, {
      method: "DELETE",
    }).then((r) => {
      const newData = studysetsData.filter((studyset) => studyset.id !== id); //
      setStudysetsData(newData);

      const newReviewsets = reviewsets.filter(
        (reviewset) => reviewset.studyset.id !== id
      );
      setReviewsets(newReviewsets);
    });
  };

  const studysetOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudysetValue({
      ...studysetValue,
      [name]: value,
    });
  };

  const handleEditButton = (studyset) => {
    setToggleEdit(
      studysetValue.id === "" || studyset.id === studysetValue.id
        ? !toggleEdit
        : toggleEdit
    );
    setStudysetValue(studyset);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`/my_studysets/${studysetValue.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studysetValue),
    })
      .then((r) => r.json())
      .then((editedData) => {
        if (editedData.errors) {
          setErrors(editedData.errors);
        } else {
          const updatedData = studysetsData.map((studyset) =>
            studyset.id !== studysetValue.id ? studyset : studysetValue
          );
          setStudysetsData(updatedData);

          const updatedReviewsets = reviewsets.map((reviewset) => {
            if (reviewset.studyset.id !== studysetValue.id) {
              return reviewset;
            }
            reviewset.studyset = studysetValue;
            return reviewset;
          });
          setReviewsets(updatedReviewsets);
        }
      });
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  let searchedData = studysetsData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <div style={{ margin: "20px" }}>
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          {onlyMine ? "View My" : "All"} Studysets
        </h1>
        <Link to="/create-studysets">
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              display: "inline-block",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Make a Studyset
          </p>
        </Link>
        <motion.img
          src={SideLogo}
          style={{ maxWidth: "5%", float: "right" }}
          drag
          dragTransition={{
            min: 0,
            max: 50,
            bounceStiffness: 120,
          }}
        />
        <br />
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Sort in Alphabetical Order
        </h1>
        <Popup
          content="Sort Alphabetically"
          trigger={<Switch onClick={handleSort} size="small" />}
        />
        <Input onChange={handleSearch} placeholder="Start Typing to Search" />
      </div>
      {toggleEdit ? (
        <Segment
          raised
          style={{
            textAlign: "center",
            margin: "10px 300px 20px 300px",
            padding: "45px 150px 45px 150px",
            border: "2px solid #0353A4",
            opacity: "0.8",
            backgroundColor: "#B9D6F2",
          }}
        >
          {errors.map((error) => (
            <h4>{error}</h4>
          ))}

          <Form onSubmit={handleUpdate}>
            <Form.Input
              label="Title"
              placeholder="Edit term"
              name="title"
              autoComplete="off"
              onChange={studysetOnChange}
              value={studysetValue.title}
            />

            <Form.Input
              label="Description"
              placeholder="Edit Description"
              name="description"
              autoComplete="off"
              onChange={studysetOnChange}
              value={studysetValue.description}
            />

            <Button type="submit">
              <Icon name="refresh" />
              Update
            </Button>
          </Form>
        </Segment>
      ) : null}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "20px",
        }}
      >
        {searchedData.map((studyset) => (
          <StudysetCard
            key={Math.random()}
            studyset={studyset}
            setStudysetsData={setStudysetsData}
            handleDelete={studyset.user.id === user.id ? handleDelete : null}
            handleEditButton={
              studyset.user.id === user.id ? handleEditButton : null
            }
          />
        ))}
      </div>
    </Segment>
  );
}

export default StudysetsContainer;
