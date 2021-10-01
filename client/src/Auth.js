import { Link, Switch, Route } from "react-router-dom";
import { Segment, Icon } from "semantic-ui-react";

import { motion } from "framer-motion";

import Signup from "./Signup";
import Login from "./Login";

function Auth({ user, onLogin }) {
  return (
    <motion.div
      drag
      dragTransition={{
        min: 0,
        max: 200,
        bounceStiffness: 120,
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Segment.Group
        raised
        style={{
          marginRight: "300px",
          marginLeft: "300px",
          marginTop: "50px",
          marginBottom: "50px",
          paddingRight: "50px",
          paddingLeft: "50px",
          paddingTop: "50px",
          paddingBottom: "100px",
          border: "2px solid #0353A4",
          opacity: "0.8",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
          }}
        >
          Brainstormers:
        </h1>
        <p
          style={{
            fontSize: "20px",
            paddingRight: "40px",
            paddingLeft: "40px",
          }}
        >
          A free website providing learning tools for students by creating your
          own studysets with terms and definitions. You can also find
          user-generated studysets that are available on the website.
          <br />
          Chances are you'll find something to study.
          <br />
          Signup or login to start brainstorming!
        </p>

        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase" }}>
          <Link to="/login">
            <Icon name="sign in alternate" />
            Login
          </Link>
          <br />
          <br />
          <Link to="/signup">
            <Icon name="signup" />
            Signup
          </Link>
        </h2>

        <Switch>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin} user={user} />
          </Route>
        </Switch>
      </Segment.Group>
    </motion.div>
  );
}

export default Auth;
