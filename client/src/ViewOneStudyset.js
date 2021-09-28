import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";
import ViewToggleFlashcard from "./ViewToggleFlashcard";
import { Icon, Popup } from "semantic-ui-react";

import Box from "@mui/material/Box";

function ViewOneStudyset({ reviewcards, setReviewcards, toggleStar, mine, toggleSave, reviewsets }) {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();
  const [editFlashcard, setEditFlashcard] = useState(null);

  useEffect(() => {
    const url = mine ? "/my_studysets" : "/studysets";

    fetch(`${url}/${id}`)
      .then((r) => r.json())
      .then((data) => setStudyset(data));
  }, [id]);

  useEffect(() => {
    if (!reviewsets || !studyset) {
      return;
    }
    setSaved(!!reviewsets.find(item => item.studyset.id === studyset.id));
  }, [reviewsets, studyset]);

  const onNewFlashcard = (flashcard) => {
    setStudyset({
      ...studyset,
      flashcards: [...studyset.flashcards, flashcard],
    });
  };
  const onEditFlashcard = (flashcard) => {
    const flashcards = studyset.flashcards.map((item) =>
      item.id === flashcard.id ? flashcard : item
    );
    setStudyset({ ...studyset, flashcards });

    const newReviewcards = reviewcards.map(reviewcard => {
      const card = reviewcard.flashcard;
      reviewcard.flashcard = card.id === flashcard.id ? flashcard : card;
      return reviewcard;
    });
    setReviewcards(newReviewcards);
  };

  const handleDelete = (id) => {
    fetch(`/flashcards/${id}`, {
      method: "DELETE",
    }).then((r) => {
      setStudyset({
        ...studyset,
        flashcards: [...studyset.flashcards.filter((item) => item.id !== id)],
      });

      const newReviewcards = reviewcards.filter(reviewcard => reviewcard.flashcard.id !== id);
      setReviewcards(newReviewcards);
    });
  };

  //more complicated one...
  const handleEdit = (flashcard) => {
    setEditFlashcard(flashcard);
  };

  console.log("Reviewsets", reviewsets);
  console.log("Studyset", studyset);
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    toggleSave(studyset.id);
  };

  if (!studyset) return null;

  return (
    <div
      key={studyset.id}
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginTop: "100px",
        border: "4px solid black",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ display: "inline-block" }}>
          Now showing {studyset.title} studyset
        </h1>
        <Popup
          content="Add or Remove Studyset to my Favorites"
          trigger={
            <Icon
            
              name={saved ? "folder" : "folder outline"}
              size="large"
              onClick={handleSave}
              style={{marginLeft: "20px"}}
            />
          }
        />
        <h4>Description: {studyset.description}</h4>
        <h4>Total Flashcards: {studyset.flashcards.length}</h4>
        <Link to="/saved-flashcards">Starred Words</Link>
      </div>

      {mine ? (
        <CreateFlashcards
          editFlashcard={editFlashcard}
          setEditFlashcard={setEditFlashcard}
          onEditFlashcard={onEditFlashcard}
          onNewFlashcard={onNewFlashcard}
          studysetId={studyset.id}
          key={studyset.id}
        />
      ) : null}

      {studyset ? (
        <Box component="span" sx={{ textAlign: "center" }}>
          {studyset.flashcards.map((flashcard) => (
            <ViewToggleFlashcard
              flashcard={flashcard}
              reviewcards={reviewcards}
              toggleStar={toggleStar}
              handleDelete={mine ? handleDelete : null}
              handleEdit={mine ? handleEdit : null}
              key={Math.random()}
            />
          ))}
        </Box>
      ) : null}
    </div>
  );
}

export default ViewOneStudyset;
