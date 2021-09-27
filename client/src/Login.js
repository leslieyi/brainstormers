import { useState } from "react";
import { Form, Input, Button, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function Login({ onLogin }) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function loginOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user, //spreading the userInput
      [name]: value,
    });
  }
  const loginSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          onLogin(data);
          history.push("/");
        }
      });
  };

  return (
    <div
      style={{
        paddingRight: "300px",
        paddingLeft: "300px",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Form onSubmit={loginSubmit} float="right">
        <Header as="h2">Login</Header>

        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          placeholder="Username"
          name="username"
          autoComplete="off"
          onChange={loginOnChange}
        />

        <Form.Field
          id="form-input-control-password"
          control={Input}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          onChange={loginOnChange}
        />

        {errors.map((error) => (
          <div>{error}</div>
        ))}
        <Button>Login</Button>
      </Form>
    </div>
  );
}

export default Login;
