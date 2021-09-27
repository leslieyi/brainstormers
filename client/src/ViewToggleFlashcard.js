import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import parse from "html-react-parser";

import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function ViewToggleFlashcard({
  flashcard: { id, word, definition },
  flashcard,
  handleDelete,
  handleEdit,
}) {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
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
            <div>Word: {word}</div>
          )}
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <Switch onClick={handleFlip} size="small" />
          <IconButton
            aria-label="edit"
            size="small"
            color="primary"
            onClick={() => handleEdit(flashcard)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            color="primary"
            onClick={() => handleDelete(id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
export default ViewToggleFlashcard;
