import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";

import IconButton from "@mui/material/IconButton";

function SavedStudysetCard({ reviewset }) {
  return (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.9)" }}

    >
      <Card sx={{ minWidth: 200, minHeight: 100 }}>
        <CardContent>
          <Typography
            component={"span"}
            variant="h5"
            style={{
              display: "inline" /*color: handleDelete? "#0353a4" : "#000000"*/,
            }}
          >
            {reviewset.studyset.title}
          </Typography>

          <Link to={`/studysets/${reviewset.studyset.id}`}>
            <Popup
              content="Go to Studysets"
              trigger={
                <IconButton aria-label="add" size="medium" color="primary">
                  <AddIcon fontSize="inherit" />
                </IconButton>
              }
            />
          </Link>

          <div>
            <Typography style={{ display: "block" }} component={"span"}>
              <b>Description:</b>
              {reviewset.studyset.description}
            </Typography>
            <Typography style={{ display: "block" }} component={"span"}>
              <b>Total Flashcards:</b> {reviewset.studyset.total_flashcards}
            </Typography>
            <Typography style={{ display: "block" }} component={"span"}>
              <b>Creator:</b> {reviewset.studyset.user.username}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
export default SavedStudysetCard;
