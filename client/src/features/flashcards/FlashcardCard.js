import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Popup } from "semantic-ui-react";
import {
  edit,
  fetchOneStudyset,
  selectMine,
  selectOneStudyset,
} from "../studyset/oneStudysetSlice";
import { selectUser } from "../user/userSlice";
import {
  fetchSavedFlashcards,
  selectReviewcardWithFlashcardId,
} from "./savedFlashcardsSlice";

function FlashcardCard({ flashcard, testingMode }) {
  const dispatch = useDispatch();

  const reviewcard = useSelector(selectReviewcardWithFlashcardId(flashcard.id));
  const mine = useSelector(selectMine);

  const user = useSelector(selectUser);
  const studyset = useSelector(selectOneStudyset);
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
            flashcard_id: flashcard.id,
            user_id: user.id,
          }),
        });
    query.then(() => dispatch(fetchSavedFlashcards()));
  };

  const handleDelete = () => {
    fetch(`/flashcards/${flashcard.id}`, {
      method: "DELETE",
    }).then(() => dispatch(fetchOneStudyset(studyset.id)));
  };

  const handleEdit = () => {
    const id = flashcard.id;
    dispatch(edit(id));
  };

  if (!flashcard) return null;

  const render = testingMode ? (
    <motion.div
      drag
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 750,
        left: 0,
      }}
      dragElastic={0.5}
    >
      <Card.Group>
        <Card>
          <Card.Content
            style={{
              justifyContent: "center",
            }}
          >
            {flip ? (
              <Card.Description>
                <b>Definition: </b> {parse(flashcard.definition)}
              </Card.Description>
            ) : (
              <Card.Description>
                <b>Term: </b>
                {flashcard.word}&nbsp;&nbsp;&nbsp;&nbsp;
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
            {mine ? (
              <Popup
                content="Edit"
                trigger={
                  <IconButton
                    aria-label="edit"
                    size="small"
                    color="primary"
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
            ) : null}

            {mine ? (
              <Popup
                content="Delete"
                trigger={
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="primary"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            ) : null}
          </div>
        </Card>
      </Card.Group>
    </motion.div>
  ) : (
    <motion.div>
      <Card.Group>
        <Card>
          <Card.Content
            style={{
              justifyContent: "center",
            }}
          >
            {flip ? (
              <Card.Description>
                <b>Definition: </b> {parse(flashcard.definition)}
              </Card.Description>
            ) : (
              <Card.Description>
                <b>Term: </b>
                {flashcard.word}&nbsp;&nbsp;&nbsp;&nbsp;
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
            {mine ? (
              <Popup
                content="Edit"
                trigger={
                  <IconButton
                    aria-label="edit"
                    size="small"
                    color="primary"
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
            ) : null}

            {mine ? (
              <Popup
                content="Delete"
                trigger={
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="primary"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            ) : null}
          </div>
        </Card>
      </Card.Group>
    </motion.div>
  );

  return render;
}
export default FlashcardCard;
