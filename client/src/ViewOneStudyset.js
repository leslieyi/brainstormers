import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";
import ViewSingleFlashcard from "./ViewSingleFlashcard";
import ReviewLater from "./ReviewLater";
import { Route, Switch } from "react-router-dom";

function ViewOneStudyset() {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();
  const [reviewcard, setReviewcard] = useState();
  const [editFlashcard, setEditFlashcard] = useState(null);

  useEffect(() => {
    fetch(`/my_studysets/${id}`)
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
    const flashcards = studyset.flashcards.map((item) => (item.id === flashcard.id) ? flashcard : item);
    setStudyset({...studyset, flashcards});
  }

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

      <CreateFlashcards
        editFlashcard={editFlashcard}
        setEditFlashcard={setEditFlashcard}
        onEditFlashcard={onEditFlashcard}
        onNewFlashcard={onNewFlashcard}
        studysetId={studyset.id}
        key={studyset.id}
      />

      {studyset ? (
        <ViewSingleFlashcard
          studyset={studyset}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : null}
    </div>
  );
}

export default ViewOneStudyset;
