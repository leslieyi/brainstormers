import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import MySingleStudyset from "./MySingleStudyset";

function MyStudysets() {
  const [errors, setErrors] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [studysetsData, setStudysetsData] = useState([]);


  //Editing the studyset
  const [studysetValue, setStudysetValue] = useState({
    title: "",
    description: "",
    id: "",
  });

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

  const studysetOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(value)
    setStudysetValue({
      ...studysetValue,
      [name]: value,
    });
  };

  const handleEditButton = (studyset) => {
    setToggleEdit((studysetValue.id === "" || studyset.id === studysetValue.id) ? !toggleEdit : toggleEdit);
    setStudysetValue(studyset);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`/my_studysets/${studysetValue.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studysetValue),
    })
      .then((r) => r.json())
      .then((editedData) => {
        if (editedData.errors) {
          setErrors(editedData.errors);
        } else {
          const updatedData = studysetsData.map(studyset => {
            if (studyset.id != studysetValue.id) {
              return studyset;
            }
            return studysetValue;
          });
          setStudysetsData(updatedData);
        }
      });
  };

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
          key={studyset.id}
          studyset={studyset}
          setStudysetsData={setStudysetsData}
          handleDelete={handleDelete}
          handleEditButton={handleEditButton}
        />
      ))}

      {toggleEdit ? (
        <>
          {errors.map((error) => (
            <h4>{error}</h4>
          ))}

          <Form onSubmit={handleUpdate}>
            <h1>Title</h1>
            <Form.Input
              placeholder="Edit term"
              name="title"
              onChange={studysetOnChange}
              autoComplete="off"
              value={studysetValue.title}
            />
            <h1>Description</h1>
            <Form.Input
              placeholder="Edit Description"
              name="description"
              onChange={studysetOnChange}
              autoComplete="off"
              value={studysetValue.description}
            />

            <Button type="submit">Update</Button>
          </Form>
        </>
      ) : null}
    </div>
  );
}

export default MyStudysets;
