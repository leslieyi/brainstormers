import { Form, Button } from "semantic-ui-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateFlashcards({studyset_id}) {
  const [errors, setErrors] = useState([]);
  const [flashcardValue, setFlashcardValue] = useState({
    word: "",
    definition: "",
    studyset_id: `${studyset_id}`,
  });



  const flashcardOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${e.target.name}: ${e.target.value}`)

    setFlashcardValue({
      ...flashcardValue, //spreading the user's input
      [name]: value, //inserting the key/value pair of the user just typed in
    });
  };



  function handleSubmit(e) {
    e.preventDefault();

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
          setFlashcardValue(data);
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
          name="word"
          onChange={flashcardOnChange}
        />

        <h1>Definition</h1>
        <ReactQuill
          theme="snow"
          name="definition"
          onChange={flashcardOnChange}
          placeholder="Enter Defnition"
        />
        <br/>

        <Button type="submit">Create Flashcard</Button>
      </Form>
    </div>
  );
}

export default CreateFlashcards;
