import { Link } from "react-router-dom";
import { Popup, Icon, Card } from "semantic-ui-react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

function SavedStudysetCard({ savedStudyset }) {
  const user = useSelector(selectUser);
  const isMine = savedStudyset.studyset.user.id === user.id;
  return (
    <Card.Group>
      <Card  >
        <Card.Content>
          <Card.Header
            style={{
              display: "inline",
    
            }}
          >
            {savedStudyset.studyset.title}
          </Card.Header>

          <Link
            to={
              (isMine ? "/my-studysets" : "/studysets") +
              `/${savedStudyset.studyset.id}`
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

          <div >
            <Card.Description>
              <b>Description:</b>
              {savedStudyset.studyset.description}
            </Card.Description>
            <Card.Meta>
              <b>Total Flashcards:</b> {savedStudyset.studyset.total_flashcards}
            </Card.Meta>
            <Card.Content>
              <Icon name= {isMine? "smile outline":"user"} style={{ color: isMine ? " #0353A4" : null }} />
              <b style={{ color: isMine ? " #0353A4" : null }}>Creator:</b>{" "}
              {savedStudyset.studyset.user.username}
            </Card.Content>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
export default SavedStudysetCard;
