import { Link } from "react-router-dom";
import { useState } from "react";

import { Popup, Icon, Card } from "semantic-ui-react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

function StudysetCard({ studyset, handleDelete, handleEditButton }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card.Group >
      <Card >
        <Card.Content>
          <Card.Header
            style={{
              display: "inline",
            }}
          >
            {studyset.title}
          </Card.Header>

          <Link
            to={(handleEditButton ? "/my-studysets" : "/studysets") + `/${studyset.id}`}
          >
            <Popup
              content="Go to Studysets"
              trigger={
                <IconButton aria-label="add" size="medium" color="primary">
                  <AddIcon fontSize="inherit" />
                </IconButton>
              }
            />
          </Link>

          {handleEditButton ? (
            <Popup
              content="Edit Studyset"
              trigger={
                <IconButton
                  aria-label="edit"
                  size="medium"
                  color="primary"
                  onClick={() => handleEditButton(studyset)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              }
            />
          ) : null}

          {handleDelete ? (
            <IconButton
              aria-label="delete"
              size="medium"
              color="primary"
              onClick={handleClickOpen}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          ) : null}

          <div>
            <Card.Description>
              <b>Description: </b>
              {studyset.description}
            </Card.Description>
            <Card.Meta>Total Flashcards: {studyset.total_flashcards}</Card.Meta>
            <Card.Content>
              <Icon name="user" />
              <b>Creator:</b> {studyset.user.username}
            </Card.Content>
          </div>
        </Card.Content>
      </Card>

      {open ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are You Sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete {studyset.title} studyset? This
              process cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              size="small"
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(studyset.id)}
              size="small"
              variant="outlined"
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Card.Group>
  );
}

export default StudysetCard;
