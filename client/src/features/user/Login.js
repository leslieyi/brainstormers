import { useState } from "react";
import { Form, Input, Button, Header, Segment, Icon } from "semantic-ui-react";

import { login, selectErrors } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();

  const errors = useSelector(selectErrors);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function loginOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <Segment
      raised
      style={{
        border: "2px solid #0353A4",
        opacity: "0.8",
        backgroundColor: "#B9D6F2",
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
        <Button>
          <Icon name="sign in alternate" />
          Login
        </Button>
      </Form>
    </Segment>
  );
}

export default Login;
