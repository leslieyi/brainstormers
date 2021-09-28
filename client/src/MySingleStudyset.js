import { Link } from "react-router-dom";
import { useState } from "react";

import { Popup } from "semantic-ui-react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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

function MySingleStudyset({ studyset, handleDelete, handleEditButton }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.9)" }}
      key={studyset.id}
    >
      <Card sx={{ minWidth: 200, minHeight: 100 }}>
        <CardContent>
          <Typography
            component={"span"}
            variant="h5"
            style={{ display: "inline", /*color: handleDelete? "#0353a4" : "#000000"*/ }}
          >
            {studyset.title}
          </Typography>

          <Link
            to={
              (handleEditButton ? "/my-studysets" : "/studysets") +
              `/${studyset.id}`
            }
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
            <IconButton
              aria-label="edit"
              size="medium"
              color="primary"
              onClick={() => handleEditButton(studyset)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
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

          <br />

          <div >
            <Typography style={{ display: "block", }} component={"span"}>
              <b>Description:</b>
              {studyset.description}
            </Typography>
            <Typography style={{ display: "block",  }} component={"span"}>
              <b>Total Flashcards:</b> {studyset.total_flashcards}
            </Typography>
            <Typography style={{ display: "block",  }} component={"span"}>
              <b>Creator:</b> {studyset.user.username}
            </Typography>
          </div>
        </CardContent>
      </Card>
      {open ? (
        <div>
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
        </div>
      ) : null}
    </Box>

  );
}

export default MySingleStudyset;
