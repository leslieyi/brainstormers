import Navbar from "./Navbar";
import TitleLogo from "./photos/brainstormers-8-cut.png";
import { Divider } from 'semantic-ui-react'

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
          bounceStiffness: 120,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.5 }}
      />
      {user ? (
        <div >
      <hr style={{	border: "0",
	borderTop:"3px solid #003559"}}/>
          <Navbar user={user} setUser={setUser} style={{ float: "right" }} />
        </div>
      ) : null}
    </div>
  );
}

export default TitleHeader;
