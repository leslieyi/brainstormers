import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FlashcardForm from "./FlashcardForm";
import FlashcardCard from "./FlashcardCard";
import { Icon, Popup, Segment } from "semantic-ui-react";
import { motion } from "framer-motion";
import SideLogo from "../../photos/logo-only.png";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchOneStudyset,
  selectMine,
  selectOneStudyset,
} from "../studyset/oneStudysetSlice";

function FlashcardsContainer({
  toggleSave,
  reviewsets,
}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const studyset = useSelector(selectOneStudyset);
  const mine = useSelector(selectMine);

  const refresh = () => dispatch(fetchOneStudyset(id));
  useEffect(refresh, [id]);

  useEffect(() => {
    if (!reviewsets || !studyset) {
      return;
    }
    setSaved(!!reviewsets.find((item) => item.studyset.id === studyset.id));
  }, [reviewsets, studyset]);

  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    toggleSave(studyset.id);
  };

  if (!studyset) return null;

  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Now showing {studyset.title} studyset
        </h1>
        <Popup
          content="Add or Remove Studyset to my Favorites"
          trigger={
            <Icon
              name={saved ? "folder" : "folder outline"}
              size="large"
              onClick={handleSave}
              style={{ marginLeft: "20px" }}
            />
          }
        />
        <motion.img
          src={SideLogo}
          style={{ maxWidth: "5%", float: "right" }}
          drag
          dragTransition={{
            min: 0,
            max: 50,
            bounceStiffness: 120,
          }}
        />
        <h4
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Description: {studyset.description}
        </h4>
        <h4
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Total Flashcards: {studyset.flashcards.length}
        </h4>
        <Link to="/saved-flashcards">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;Starred Words
        </Link>

        {mine ? <FlashcardForm /> : null}
      </div>

      {studyset ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            paddingBottom: "20px",
          }}
        >
          {studyset.flashcards.map((flashcard) => (
            <FlashcardCard
              flashcard={flashcard}
              key={Math.random()}
            />
          ))}
        </div>
      ) : null}
    </Segment>
  );
}

export default FlashcardsContainer;
