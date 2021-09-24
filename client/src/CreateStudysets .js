import { Form, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// import CreateFlashcards from "./CreateFlashcards";

function CreateStudysets() {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [studysetValue, setStudysetValue] = useState({
    title: "",
    description: "",
  });


  const studysetOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStudysetValue({
      ...studysetValue, 
      [name]: value, 
    });

  };


  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/studysets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studysetValue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setStudysetValue(data);
          history.push(`/my-studysets/${data.id}`);
        }
      });
  }

  return (
    <div
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop:"100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
      }}
    >
      {errors.map((error) => (
        <h4>{error}</h4>
      ))}
      <Form onSubmit={handleSubmit}>
        <h1>Title</h1>
        <Form.Input
          placeholder="Enter term"
          name="title"
          onChange={studysetOnChange}
          autoComplete="off"
        />
        <h1>Description</h1>
        <Form.Input
          placeholder="Enter Description"
          name="description"
          onChange={studysetOnChange}
          autoComplete="off"
        />

        <Button type="submit">Submit</Button>
      </Form>

    </div>
  );
}

export default CreateStudysets;
