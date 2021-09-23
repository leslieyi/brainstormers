import { Form, Button } from "semantic-ui-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateFlashcards({ studyset_id, onNewFlashcard }) {
  const [errors, setErrors] = useState([]);
  const blankFlashcard = {
    word: "",
    definition: "<p><br></p>",
    studyset_id: `${studyset_id}`,
  };
  const [flashcardValue, setFlashcardValue] = useState({ ...blankFlashcard });

  const flashcardOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${e.target.name}: ${e.target.value}`);

    setFlashcardValue((flashcardValue) => {
      return {
        ...flashcardValue, //spreading the user's input
        [name]: value, //inserting the key/value pair of the user just typed in
      };
    });
  };

  const quillOnChange = (content, delta, source, editor) => {
    console.log(editor);
    flashcardOnChange({ target: { name: "definition", value: content } });
    //making my own e.target.value and e.target.name bc I don't know how else to attach the event
  };

  function handleSubmit(e) {
    e.preventDefault();

    console.log(flashcardValue);
    fetch(`/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flashcardValue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          onNewFlashcard(data);
          setFlashcardValue({ ...blankFlashcard });
        }
      });
    e.target.reset();
  }

  return (
    <div>
      {errors.map((error) => (
        <h4>{error}</h4>
      ))}
      <Form onSubmit={handleSubmit}>
        <h1>Term</h1>
        <Form.Input
          placeholder="Enter Term"
          value={flashcardValue.word}
          name="word"
          onChange={flashcardOnChange}
        />

        <h1>Definition</h1>
        <ReactQuill
          theme="snow"
          value={flashcardValue.definition}
          onChange={quillOnChange}
          placeholder="Enter Defnition"
        />
        <br />

        <Button type="submit">Create Flashcard</Button>
      </Form>
    </div>
  );
}

export default CreateFlashcards;
