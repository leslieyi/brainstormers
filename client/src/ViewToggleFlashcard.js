import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import parse from "html-react-parser";

import { Icon } from "semantic-ui-react";
import { Popup } from "semantic-ui-react";

import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function ViewToggleFlashcard({
  flashcard: { id, word, definition },
  flashcard,
  handleDelete,
  handleEdit,
}) {
  const [flip, setFlip] = useState(false);
  const [starred, setStarred] = useState(false);


  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleStar = () => {
    setStarred(!starred);

    // fetch("/reviewcards", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(reviewcard),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setReviewcard(data);
    //   });
  };

  return (
    <Card
      sx={{
        minWidth: 250,
        minHeight: 200,
        display: "inline-block",
        margin: "20px",
      }}
    >
      <CardContent style={{}}>
        <Typography
          key={id}
          style={{
            fontSize: "20px",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          {flip ? (
            <div>Definition: {parse(definition)}</div>
          ) : (
            <div>
              Word: {word}{" "}
              <Popup
                content="Add to Flashcard to Review Later"
                trigger={
                  <Icon
                    name={starred ? "star" : "star outline"}
                    size="small"
                    onClick={handleStar}
                  />
                }
              />
            </div>
          )}
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <Popup
            content="Flip"
            trigger={<Switch onClick={handleFlip} size="small" />}
          />
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
        </div>
      </CardContent>
    </Card>
  );
}
export default ViewToggleFlashcard;
