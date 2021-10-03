import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Segment, Icon } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { createStudyset } from "./studysetsSlice";

function StudysetForm() {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const dispatch = useDispatch();

  const [studysetInputValue, setStudysetInputValue] = useState({
    title: "",
    description: "",
  });

  const studysetOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStudysetInputValue({
      ...studysetInputValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createStudyset(studysetInputValue))
    .then(action => {
      const data = action.payload;
      if (!data.errors) {
        history.push(`/my-studysets/${data.id}`);
      } else {
        setErrors(data.errors);
      }
    });
    e.target.reset(); //added this 10.01
  }

  return (
    <Segment
      raised
      style={{
        border: "2px solid #0353A4",
        opacity: "0.8",
        margin: "30px 300px 30px 300px",
        padding: "45px 150px 45px 150px",
        backgroundColor: "#B9D6F2",
      }}
    >
      {errors.map((error) => (
        <h4>{error}</h4>
      ))}
      <Form onSubmit={handleSubmit}>
        <h1
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Title
        </h1>
        <Form.Input
          placeholder="Enter term"
          name="title"
          onChange={studysetOnChange}
          autoComplete="off"
        />
        <h1
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Description
        </h1>
        <Form.Input
          placeholder="Enter Description"
          name="description"
          onChange={studysetOnChange}
          autoComplete="off"
        />

        <Button type="submit" style={{ backgroundColor: "white" }}>
          <Icon name="paper plane outline" />
          Submit
        </Button>
      </Form>
    </Segment>
  );
}

export default StudysetForm;
