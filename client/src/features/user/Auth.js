import { Link, Route, Switch } from "react-router-dom";
import { Icon, Segment } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";
import { motion } from "framer-motion";

function Auth() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{  scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 100,
        mass: 5,

      }}
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
          A free, multi-national Korean-American website providing tools used
          for studying and learning. Brainstormers' primary products include
          creating your own studysets, flashcards with terms and definitions and
          practice games. You can also find user-generated studysets that are
          available on the website. Chances are you'll find something to study.
          <br />
          Signup or login to start brainstorming!
        </p>

        <h2
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            textTransform: "uppercase",
          }}
        >
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
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Segment.Group>
    </motion.div>
  );
}

export default Auth;
