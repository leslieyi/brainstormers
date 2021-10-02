import Navbar from "./Navbar";
import TitleLogo from "../../photos/brainstormers-8-cut.png";
import { Divider } from "semantic-ui-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";

function TitleHeader() {
  const user = useSelector(selectUser);

  return (
    <div>
      <motion.img
        src={TitleLogo}
        style={{
          maxWidth: "25%",
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
        <div>
          <Divider
            fitted
            style={{
              border: "0",
              borderTop: "2px solid #0353A4",
              opacity: "0.8",
            }}
          />

          <Navbar style={{ float: "right" }} />
          <Divider
            fitted
            style={{
              border: "0",
              borderTop: "2px solid #0353A4",
              opacity: "0.8",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default TitleHeader;
