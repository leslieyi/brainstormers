import { Form, Button, Divider } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import CreateFlashcards from "./CreateFlashcards";

function CreateStudysets() {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [studysetValue, setStudysetValue] = useState({
    title: "",
    description: "",
  });
  const [flashcardValue, setFlashcardValue] = useState({
    word: "",
    definition: "",
  });

  const studysetOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStudysetValue({
      ...studysetValue, //spreading the user's input
      [name]: value, //inserting the key/value pair of the user just typed in
    });
    // console.log(`${name} ${value}`);
  };

  const flashcardOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFlashcardValue({
      ...flashcardValue, //spreading the user's input
      [name]: value, //inserting the key/value pair of the user just typed in
    });
    // console.log(`${name} ${value}`);
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
        margin: "100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "50px",
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

        {/* <Divider />

        <h1>Term</h1>
        <Form.Input
          placeholder="Enter Term"
          name="word"
          onChange={flashcardOnChange}
        />

        <h1>Definition</h1>
        <ReactQuill
          theme="snow"
          name="definition"
          onChange={flashcardOnChange}
          placeholder="type"
        />
        <br /> */}
        <Button type="submit">Submit</Button>
      </Form>

      {/* <CreateFlashcards /> */}
    </div>
  );
}

export default CreateStudysets;
