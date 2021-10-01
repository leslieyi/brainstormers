import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Card, Icon, Popup } from "semantic-ui-react";

import parse from "html-react-parser";

import { useState } from "react";

function FlashcardCard({
  flashcard: { id, word, definition },
  flashcard,
  handleDelete,
  handleEdit,
  reviewcards,
  toggleStar,
}) {
  const [flip, setFlip] = useState(false);
  const [starred, setStarred] = useState(
    !!reviewcards.find((item) => item.flashcard.id === flashcard.id)
  );

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleStar = () => {
    setStarred(!starred);
    toggleStar(flashcard.id);
  };

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
              <b>Definition: </b> {parse(definition)}
            </Card.Description>
          ) : (
            <Card.Description>
              <b>Term: </b>
              {word}&nbsp;&nbsp;&nbsp;&nbsp;
              <Popup
                content="Add to Flashcard to Review Later"
                trigger={
                  <Icon
                    name={starred ? "star" : "star outline"}
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
          {handleEdit ? (
            <Popup
              content="Edit"
              trigger={
                <IconButton
                  aria-label="edit"
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(flashcard)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
          ) : null}

          {handleDelete ? (
            <Popup
              content="Delete"
              trigger={
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleDelete(id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          ) : null}
        </div>
      </Card>
    </Card.Group>
  );
}
export default FlashcardCard;
