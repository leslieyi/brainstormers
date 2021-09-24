import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";
import parse from "html-react-parser";

function ViewSingleStudyset() {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();

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

  if (!studyset) return null;

  return (
    <div
      key={studyset.id}
      style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop:"100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
      }}
    >
      <h1>Now showing {studyset.title} studyset </h1>
      <h2>Description: {studyset.description}</h2>
      <h2>Total Flashcards: {studyset.total_flashcards}</h2>
      {studyset.flashcards.map((flashcard) => (
        <div key={flashcard.id} style={{ border: "4px solid black" }}>
          <p>Word: {flashcard.word}</p>
          <>Flashcard: {parse(flashcard.definition)}</>
        </div>
      ))}

      <CreateFlashcards
        onNewFlashcard={onNewFlashcard}
        studyset_id={studyset.id}
        key={studyset.id}
      />
    </div>
  );
}

export default ViewSingleStudyset;
