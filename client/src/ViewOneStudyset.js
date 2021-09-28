import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";
import Box from "@mui/material/Box";
import ViewToggleFlashcard from "./ViewToggleFlashcard";

function ViewOneStudyset({ reviewcards, toggleStar, mine }) {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();
  const [editFlashcard, setEditFlashcard] = useState(null);

  useEffect(() => {
    const url = mine ? "/my_studysets" : "/studysets";
    fetch(`${url}/${id}`)
      .then((r) => r.json())
      .then((data) => setStudyset(data));
  }, [id]);

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
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`/flashcards/${id}`, {
      method: "DELETE",
    }).then((r) => {
      setStudyset({
        ...studyset,
        flashcards: [...studyset.flashcards.filter((item) => item.id !== id)],
      });
    });
  };

  //more complicated one...
  const handleEdit = (flashcard) => {
    console.log(flashcard);
    setEditFlashcard(flashcard);
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
        <h1>Now showing {studyset.title} studyset </h1>
        <h4>Description: {studyset.description}</h4>
        <h4>Total Flashcards: {studyset.flashcards.length}</h4>
        <Link to="/review-later-studysets">Starred Words</Link>
      </div>

      {mine ? <CreateFlashcards
        editFlashcard={editFlashcard}
        setEditFlashcard={setEditFlashcard}
        onEditFlashcard={onEditFlashcard}
        onNewFlashcard={onNewFlashcard}
        studysetId={studyset.id}
        key={studyset.id}
      /> : null}

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
