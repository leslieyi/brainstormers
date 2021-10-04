import {
  Form,
  Input,
  TextArea,
  Button,
  Segment,
  Icon,
} from "semantic-ui-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, fetchUser } from "./userSlice";

function Profile() {
  const user = useSelector(selectUser);
  const [errors, setErrors] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const dispatch = useDispatch();

  const handleProfileEdit = () => {
    setEditButton(!editButton);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit ");
    fetch("/edit-profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          dispatch(fetchUser());
          setEditButton(!editButton);
        }
      });
  };

  const [userInput, setUserInput] = useState({ ...user });

  function inputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({
      ...userInput, //spreading the userInput
      [name]: value, //inserting the name and value the user typed in
    });
    // e.target.reset();
  }

  return (
    <Segment
      raised
      style={{
        border: "2px solid #0353A4",
        opacity: "0.8",
        margin: "30px 300px 30px 300px",
        padding: "45px 150px 45px 150px",
        backgroundColor: "#B9D6F2",
      }}
    >
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "30px",
        }}
      >
        <b>Username: </b>
        {user.username}
      </p>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "30px",
        }}
      >
        <b> Bio: </b>
        {user.bio}
      </p>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "30px",
        }}
      >
        <b>Email: </b> {user.email}
      </p>
      <motion.p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "30px",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        You have created <b>{user.studysets.length}</b> studysets!{" "}
        <Icon name="trophy" />
      </motion.p>

      <Button onClick={handleProfileEdit} style={{ backgroundColor: "white" }}>
        <Icon name="edit" />
        Click here to edit profile
      </Button>

      {editButton ? (
        <Form onSubmit={handleSubmit}>
          {errors.map((error) => (
            <h2>{error}</h2>
          ))}

          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-username"
              control={Input}
              label="Username"
              name="username"
              placeholder="Username"
              autoComplete="off"
              onChange={inputOnChange}
              value={userInput.username}
            />

            <Form.Field
              id="form-input-control-email"
              control={Input}
              label="Email"
              name="email"
              placeholder="Email Address"
              onChange={inputOnChange}
              value={userInput.email}
            />

            <Form.Field
              id="form-input-control-password"
              control={Input}
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              onChange={inputOnChange}
              value={userInput.password}
            />
          </Form.Group>

          <Form.Field
            id="form-input-control-bio"
            control={TextArea}
            label="Bio"
            name="bio"
            placeholder="Bio"
            onChange={inputOnChange}
            value={userInput.bio}
          />
          <Button type="submit">
            <Icon name="signup" />
            Submit
          </Button>
          <Button onClick={() => setEditButton(!editButton)}>Cancel</Button>
        </Form>
      ) : null}
    </Segment>
  );
}
export default Profile;
