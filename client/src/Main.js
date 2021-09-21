import { Form, Button } from "semantic-ui-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Main() {
  const [value, setValue] = useState("");
// console.log(value)
  return (
    <div
      style={{
        margin: "100px",
        paddingRight: "300px",
        paddingLeft: "300px",
        paddingTop: "50px",
        paddingBottom: "50px",
        border: "4px solid black",
      }}
    >
      <Form>
        <h1>Term</h1>
        <Form.Input placeholder="Enter term" />
        <h1>Definition</h1>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="type"
        />
        <br/>
        
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Main;
