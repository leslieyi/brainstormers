import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Icon,
  Popup,
  Segment,
  Table,
  Divider,
} from "semantic-ui-react";
import ColorLogo from "../../photos/cut-out-logo.png";
import SideLogo from "../../photos/logo-only.png";
import {
  fetchSavedStudysets,
  selectReviewsetWithStudysetId,
} from "../savedStudysets/savedStudysetsSlice";
import {
  fetchOneStudyset,
  selectMine,
  selectOneStudyset,
} from "../studyset/oneStudysetSlice";
import { selectUser } from "../user/userSlice";
import FlashcardCard from "./FlashcardCard";
import FlashcardForm from "./FlashcardForm";
import Timer from "./Timer";

function FlashcardsContainer() {
  const { id } = useParams();
  const [viewList, setViewList] = useState(false);
  const dispatch = useDispatch();
  const studyset = useSelector(selectOneStudyset);
  const mine = useSelector(selectMine);
  const user = useSelector(selectUser);
  const reviewset = useSelector(selectReviewsetWithStudysetId(id));
  const refresh = () => dispatch(fetchOneStudyset(id));
  useEffect(refresh, [id, dispatch]);

  const [testingMode, setTestingMode] = useState(false);

  const handleSave = () => {
    const query = reviewset
      ? fetch(`/reviewsets/${reviewset.id}`, { method: "DELETE" })
      : fetch("/reviewsets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studyset_id: studyset.id, user_id: user.id }),
        });
    query.then(() => dispatch(fetchSavedStudysets()));
  };
  const toggleStudyMode = () => {
    setTestingMode(!testingMode);
  };
  if (!studyset) return null;

  return (
    <div>
      <Segment
        raised
        style={{
          margin: "30px 100px 30px 100px",
          border: "2px solid #0353A4",
          opacity: "0.8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              display: "inline-block",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Now showing {studyset.title} studyset
          </h1>
          <Popup
            content="Add or Remove Studyset to my Favorites"
            trigger={
              <Icon
                name={reviewset ? "folder" : "folder outline"}
                size="large"
                onClick={handleSave}
                style={{ marginLeft: "20px" }}
              />
            }
          />
          <Popup
            content="Turn on/off Testing Mode"
            trigger={
              <motion.img
                src={testingMode ? ColorLogo : SideLogo}
                style={{
                  maxWidth: "5%",
                  verticalAlign: "middle",
                  margin: "20px",
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={toggleStudyMode}
              />
            }
          />
          <h4
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Description: {studyset.description}
          </h4>
          <h4
            style={{
              display: "inline-block",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Total Flashcards: {studyset.flashcards.length}
          </h4>
          <Link to="/saved-flashcards">
            &nbsp;&nbsp;&nbsp;&nbsp;Starred Words
          </Link>

          {mine ? <FlashcardForm /> : null}
          <Button
            onClick={() => setViewList(!viewList)}
            style={{ backgroundColor: "white", fontSize: "16px" }}
          >
            <Icon name={viewList ? "angle up" : "angle down"} />
            {viewList ? "Collapse List" : "View List"}
          </Button>
          {viewList ? (
            <div
              style={{
                justifyContent: "center",
                textAlign: "center",
                padding: "20px 100px 20px 100px",
              }}
            >
              <Table
                definition
                celled
                striped
                style={{
                  border: "2px solid #0353A4",
                  opacity: "0.8",
                  backgroundColor: "#DDEBF9",
                }}
              >
                <Table.Body>
                  {studyset.flashcards.map((flashcard) => (
                    <Table.Row key={flashcard.id}>
                      <Table.Cell width={2} style={{ color: "#0353A4" }}>
                        {flashcard.word}
                      </Table.Cell>
                      <Table.Cell>{parse(flashcard.definition)} </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : null}
        </div>

        {studyset ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              paddingBottom: "20px",
            }}
          >
            {studyset.flashcards.map((flashcard) => (
              <FlashcardCard
                flashcard={flashcard}
                key={Math.random()}
                testingMode={testingMode}
              />
            ))}
          </div>
        ) : null}
      </Segment>
      {testingMode ?  <Divider horizontal ><Timer/></Divider>: null}
     
    </div>
  );
}

export default FlashcardsContainer;
