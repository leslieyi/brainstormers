import { useState } from "react";
import { Form, Input, TextArea, Button, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function Signup({ onLogin }) {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  function inputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({
      ...userInput, //spreading the userInput
      [name]: value, //inserting the name and value the user typed in
    });
    // e.target.reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    //  console.log("I was clicked")
    fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div
      style={{
        paddingRight: "300px",
        paddingLeft: "300px",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Header as="h2">Sign Up</Header>
      {errors.map((error) => (
        <h2>{error}</h2>
      ))}

      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            id="form-input-control-username"
            control={Input}
            label="Username"
            name="username"
            placeholder="Username"
            autoComplete="off"
            onChange={inputOnChange}
          />

          <Form.Field
            id="form-input-control-email"
            control={Input}
            label="Email"
            name="email"
            placeholder="Email Address"
            onChange={inputOnChange}
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
          />
        </Form.Group>

        <Form.Field
          id="form-input-control-bio"
          control={TextArea}
          label="Bio"
          name="bio"
          placeholder="Bio"
          onChange={inputOnChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Signup;
