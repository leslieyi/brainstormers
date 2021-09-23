import { Form, Button } from "semantic-ui-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateFlashcards() {
  const [flashcardValue, setFlashcardValue] = useState({
    word: "",
    definition: "",
  });

  const flashcardOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFlashcardValue({
      ...flashcardValue, //spreading the user's input
      [name]: value, //inserting the key/value pair of the user just typed in
    });
  };

  const handleSubmit = (e) => {
    console.log("Iwas clicked");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default CreateFlashcards;
