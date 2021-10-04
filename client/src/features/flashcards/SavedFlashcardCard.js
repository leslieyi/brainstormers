import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Card, Icon, Popup } from "semantic-ui-react";

import parse from "html-react-parser";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  edit,
  selectOneStudyset,
  fetchOneStudyset,
} from "../studyset/oneStudysetSlice";
import {
  fetchSavedFlashcards,
  selectReviewcardWithFlashcardId,
} from "./savedFlashcardsSlice";
import { selectUser } from "../user/userSlice";

function SavedFlashcardCard({ savedFlashcard }) {
  const dispatch = useDispatch();

  const refresh = () => dispatch(fetchSavedFlashcards());
  useEffect(refresh, [dispatch]);
  const reviewcard = useSelector(selectReviewcardWithFlashcardId(savedFlashcard.flashcard.id));
  const user = useSelector(selectUser);
  const studyset = useSelector(selectOneStudyset);
  const [flip, setFlip] = useState(false);
  const mine = savedFlashcard.user.id == user.id
  console.log("hello?", savedFlashcard)
  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleStar = () => {
    const query = reviewcard
      ? fetch(`/reviewcards/${reviewcard.id}`, { method: "DELETE" })
      : fetch("/reviewcards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            flashcard_id: savedFlashcard.flashcard.id,
            user_id: user.id,
          }),
        });
    query.then(() => dispatch(fetchSavedFlashcards()));
  };


  if (!savedFlashcard.flashcard) return null;

  return (
    <Card.Group>
      <Card>
        <Card.Content
          style={{
            justifyContent: "center",
          }}
        >
          {flip ? (
            <Card.Description>
              <b>Definition: </b> {parse(savedFlashcard.flashcard.definition)}
            </Card.Description>
          ) : (
            <Card.Description>
              <b>Term: </b>
              {savedFlashcard.flashcard.word}&nbsp;&nbsp;&nbsp;&nbsp;
              <Popup
                content="Add to Flashcard to Review Later"
                trigger={
                  <Icon
                    name={reviewcard ? "star" : "star outline"}
                    onClick={handleStar}
                  />
                }
              />
            </Card.Description>
          )}
        </Card.Content>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Popup
            content="Flip"
            trigger={<Switch onClick={handleFlip} size="small" />}
          />

        </div>
      </Card>
    </Card.Group>
  );
}
export default SavedFlashcardCard;
