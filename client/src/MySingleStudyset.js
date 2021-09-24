import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Link } from "react-router-dom";
import { useState } from "react";

function MySingleStudyset({ studyset }) {
  const handleDelete = () => {
    console.log("I was clicked");
  };

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
      key={studyset.id}
    >
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography
            variant="h5"
            style={{ display: "inline", marginRight: "30px" }}
          >
            {studyset.title}
          </Typography>

          <Link to={`/my-studysets/${studyset.id}`}>
            <IconButton aria-label="add" size="medium" color="primary">
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Link>

          <IconButton
            aria-label="delete"
            size="medium"
            color="primary"
            onClick={handleToggle}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardContent>
      </Card>
      {isClicked ? (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert — <strong>check it out!</strong>
        </Alert>
      ) : null}
    </Box>
  );
}

export default MySingleStudyset;
