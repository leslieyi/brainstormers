import Switch from "@mui/material/Switch";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Icon, Input, Popup, Segment } from "semantic-ui-react";
import SideLogo from "../../photos/logo-only.png";
import StudysetCard from "./StudysetCard";
import { fetchStudysets, selectStudysets } from "./studysetsSlice";


function StudysetsContainer({ mine }) {
  const studysetsData = useSelector(selectStudysets);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [studysetValue, setStudysetValue] = useState({
    title: "",
    description: "",
    id: "",
  });

  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);
  const handleSort = () => {
    setSorted(!sorted);
  };

  const refresh = () => {
    dispatch(fetchStudysets({ mine, sorted }));
  };

  useEffect(refresh, [dispatch, mine, sorted]);

  const handleDelete = (id) => {
    fetch(`/my_studysets/${id}`, {
      method: "DELETE",
    }).then((r) => refresh());
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
          refresh();
          setToggleEdit(!toggleEdit);
        }
      });
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const searchedData = studysetsData.filter(
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
          {mine ? "View My" : "All"} Studysets
        </h1>
        <Link to="/create-studysets">
          <motion.p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              display: "inline-block",
              fontSize: "20px"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Make a Studyset
          </motion.p>
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
            fontSize: "25px",
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
            handleDelete={handleDelete}
            handleEditButton={handleEditButton}
          />
        ))}
      </div>
    </Segment>
  );
}

export default StudysetsContainer;
