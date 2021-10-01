import { Form, Button, Segment, Icon } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function FlashcardForm({
  onNewFlashcard,
  editFlashcard,
  setEditFlashcard,
  onEditFlashcard,
  studysetId,
}) {
  const [errors, setErrors] = useState([]);
  const blankFlashcard = {
    word: "",
    definition: "<p><br></p>",
    studyset_id: studysetId,
  };
  const [flashcardValue, setFlashcardValue] = useState({ ...blankFlashcard });

  useEffect(() => {
    setFlashcardValue(editFlashcard || { ...blankFlashcard });
  }, [editFlashcard]);

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

  const quillOnChange = (content, editor) => {
    console.log(editor);
    flashcardOnChange({ target: { name: "definition", value: content } });
    //making my own e.target.value and e.target.name bc I don't know how else to attach the event
  };

  function handleSubmit(e) {
    e.preventDefault();

    console.log(flashcardValue);
    const url = editFlashcard
      ? `/flashcards/${flashcardValue.id}`
      : "/flashcards";
    const method = editFlashcard ? "PATCH" : "POST";
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flashcardValue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else if (editFlashcard) {
          setEditFlashcard(null);
          onEditFlashcard(data);
        } else {
          onNewFlashcard(data);
          setFlashcardValue({ ...blankFlashcard });
        }
      });
    e.target.reset();
  }

  return (
    <Segment
      raised
      style={{
        border: "2px solid #0353A4",
        opacity: "0.8",
        margin: "30px 300px 30px 300px",
        padding: "45px 50px 45px 50px",
        backgroundColor: "#B9D6F2",
      }}
    >
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
          style={{ backgroundColor: "white" }}
        />
        <br />

        <Button type="submit" style={{ backgroundColor: "white" }}>
          <Icon name="paper plane outline" />
          {editFlashcard ? "Update" : "Create"}
        </Button>
        {editFlashcard ? (
          <Button onClick={() => setEditFlashcard(null)}>Cancel</Button>
        ) : null}
      </Form>
    </Segment>
  );
}

export default FlashcardForm;
