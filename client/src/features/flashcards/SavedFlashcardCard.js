import Switch from "@mui/material/Switch";
import parse from "html-react-parser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Popup } from "semantic-ui-react";
import { selectUser } from "../user/userSlice";
import {
  fetchSavedFlashcards,
  selectReviewcardWithFlashcardId
} from "./savedFlashcardsSlice";


function SavedFlashcardCard({ savedFlashcard }) {
  const dispatch = useDispatch();

  const reviewcard = useSelector(selectReviewcardWithFlashcardId(savedFlashcard.flashcard.id));
  const user = useSelector(selectUser);
  const [flip, setFlip] = useState(false);
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
