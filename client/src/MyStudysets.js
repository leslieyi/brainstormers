import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import MySingleStudyset from "./MySingleStudyset";

function MyStudysets() {
  const [errors, setErrors] = useState([]);

  const [studysetsData, setStudysetsData] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);



  useEffect(() => {
    fetch(`/my_studysets/`).then((r) => {
      if (r.ok) {
        r.json().then((data) => setStudysetsData(data));
      }
    });
  }, []);

  const handleDelete = (id) => {
    fetch(`/my_studysets/${id}`, {
      method: "DELETE",
    }).then((r) => {
      const newData = studysetsData.filter((studyset) => studyset.id !== id);
      setStudysetsData(newData);
    });
  };

  const handleEditButton = () => {
    setToggleEdit(!toggleEdit);
    console.log("I'm clicked")
  };

  const [studysetValue, setStudysetValue] = useState({
    title: "" ,
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

  const handleUpdate = (e) => {
    e.preventDefault()
  }

  return (
    <div
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop: "100px",
        paddingRight: "50px",
        paddingLeft: "50px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{ display: "inline" }}>View My Studysets</h1>{" "}
        <Link to="/create-studysets">Make a Studyset</Link>
      </div>

      {studysetsData.map((studyset) => (
        <MySingleStudyset
          studyset={studyset}
          setStudysetsData={setStudysetsData}
          key={studyset.id}
          handleDelete={handleDelete}
          handleEditButton={handleEditButton}
        />
      ))}

      {toggleEdit ? (
        <Form onSubmit={handleUpdate} >
          <h1>Title</h1>
          <Form.Input
            placeholder="Enter term"
            name="title"
            onChange={studysetOnChange}
            autoComplete="off"
            value={studysetsData.title}
          />
          <h1>Description</h1>
          <Form.Input
            placeholder="Enter Description"
            name="description"
            onChange={studysetOnChange}
            autoComplete="off"
            value={studysetsData.description}
          />

          <Button type="submit">Update</Button>
        </Form>
      ) : null}
    </div>
  );
}

export default MyStudysets;
