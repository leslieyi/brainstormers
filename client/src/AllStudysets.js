import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MySingleStudyset from "./MySingleStudyset";

import { Popup, Form, Button, Input } from "semantic-ui-react";
import Switch from "@mui/material/Switch";



function AllStudysets({ onlyMine, user, reviewsets, setReviewsets }) {
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

      const newReviewsets = reviewsets.filter(reviewset => reviewset.studyset.id !== id);
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
          const updatedData = studysetsData.map((studyset) => studyset.id !== studysetValue.id ? studyset : studysetValue);
          setStudysetsData(updatedData);

          const updatedReviewsets = reviewsets.map(reviewset => {
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
    <div
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop: "100px",
        paddingRight: "50px",
        paddingLeft: "50px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
        // backgroundColor: "hsla(209, 49%, 50%, 0.59)"
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{ display: "inline-block" }}>
          {onlyMine ? "View My" : "All"} Studysets
        </h1>
        <Link to="/create-studysets">Make a Studyset</Link>
        <div>
          Sort in Alphabetical Order
          <Popup
            content="Sort Alphabetically"
            trigger={<Switch onClick={handleSort} size="small" />}
          />
          <Input onChange={handleSearch} placeholder="Start Typing to Search" />
        </div>
      </div>

      {searchedData.map((studyset) => (
        <MySingleStudyset
          key={Math.random()}
          studyset={studyset}
          setStudysetsData={setStudysetsData}
          handleDelete={studyset.user.id === user.id ? handleDelete : null}
          handleEditButton={
            studyset.user.id === user.id ? handleEditButton : null
          }
        />
      ))}

      {toggleEdit ? (
        <>
          {errors.map((error) => (
            <h4>{error}</h4>
          ))}

          <Form onSubmit={handleUpdate}>
            <h1>Title</h1>
            <Form.Input
              placeholder="Edit term"
              name="title"
              onChange={studysetOnChange}
              autoComplete="off"
              value={studysetValue.title}
            />
            <h1>Description</h1>
            <Form.Input
              placeholder="Edit Description"
              name="description"
              onChange={studysetOnChange}
              autoComplete="off"
              value={studysetValue.description}
            />

            <Button type="submit">Update</Button>
          </Form>
        </>
      ) : null}
    </div>
  );
}

export default AllStudysets;
