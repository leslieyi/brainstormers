import { Link } from "react-router-dom";
import { Popup, Icon, Card } from "semantic-ui-react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
// import { useSelector } from "react-redux";
// import { selectUser } from "./user/userSlice";

function SavedStudysetCard({ reviewset }) {
  // const user = useSelector(selectUser);
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header
            style={{
              display: "inline",
            }}
          >
            {reviewset.studyset.title}
          </Card.Header>

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
            <Card.Description>
              <b>Description:</b>
              {reviewset.studyset.description}
            </Card.Description>
            <Card.Meta>
              <b>Total Flashcards:</b> {reviewset.studyset.total_flashcards}
            </Card.Meta>
            <Card.Content>
              <Icon name="user" /> <b>Creator:</b>{" "}
              {reviewset.studyset.user.username}
            </Card.Content>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
export default SavedStudysetCard;
