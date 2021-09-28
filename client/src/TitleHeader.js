import Navbar from "./Navbar";
import TitleLogo from "./photos/brainstormers-8-cut.png";
import { Image } from "semantic-ui-react";
import { useState } from "react";
import { motion } from "framer-motion";

function TitleHeader({ user, setUser }) {

  return (
    <div>
      <motion.img
        src={TitleLogo}
        style={{
          maxWidth: "20%",
          margin: "auto",
          paddingTop: "20px",
          display: "block",
        }}
        drag
        dragTransition={{
          min: 0,
          max: 0,
          bounceStiffness: 150
        }}
        // initial={{ scale: 0 }}
        // animate={{ rotate: 360, scale: 1 }}
        // transition={{
        //   type: "spring",
        //   stiffness: 450,
        //   damping: 60,
        //   duration: 0.5
        // }}
        whileHover={{ scale: 1.1  }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3}}
      />
      {user ? (
        <div style={{ display: "inline", }}>
          <h1 style= {{textAlign:"center"}}>Welcome {user.username}, to Brainstormers</h1>

          <Navbar user={user} setUser={setUser} style={{float: "right"}}/>
        </div>
      ) : null}
    </div>
  );
}

export default TitleHeader;
