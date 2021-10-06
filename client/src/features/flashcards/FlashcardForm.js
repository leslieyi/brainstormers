import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Segment } from "semantic-ui-react";
import { cancelEdit, fetchOneStudyset, selectEditing, selectOneStudyset } from "../studyset/oneStudysetSlice";

function FlashcardForm() {
  const dispatch = useDispatch();
  const studyset = useSelector(selectOneStudyset);
  const editFlashcard = useSelector(selectEditing);

  const [errors, setErrors] = useState([]);
  const blankFlashcard = useMemo(() => ({
    id: null,
    word: "",
    definition: "<p><br></p>",
    studyset_id: studyset.id,
  }), [studyset]);
  const [flashcardValue, setFlashcardValue] = useState({ ...blankFlashcard });

  useEffect(() => {
    setFlashcardValue(editFlashcard || { ...blankFlashcard });
  }, [editFlashcard, blankFlashcard]);

  const flashcardOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFlashcardValue((flashcardValue) => {
      return {
        ...flashcardValue,
        [name]: value,
      };
    });
  };

  const quillOnChange = (content) => {
    flashcardOnChange({ target: { name: "definition", value: content } });
  };

  function handleSubmit(e) {
    e.preventDefault();

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
        } else {
          dispatch(fetchOneStudyset(studyset.id));
          setFlashcardValue({...blankFlashcard});
        }
      });
  }

  return (
    <Segment
      raised
      style={{
        border: "2px solid #0353A4",
        opacity: "0.85",
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
          <Button onClick={() => dispatch(cancelEdit())}>Cancel</Button>
        ) : null}
      </Form>
    </Segment>
  );
}

export default FlashcardForm;
