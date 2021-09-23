import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";

function ViewSingleStudyset() {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();
  useEffect(() => {
    fetch(`/my_studysets/${id}`)
      .then((r) => r.json())
      .then((data) => setStudyset(data));
  }, [id]);

  if (!studyset) return null;

  return (
    <div
      style={{
        margin: "100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "50px",
        border: "4px solid black",
      }}
    >
      <h1>Now showing {studyset.title} studyset </h1>
      <h2>Description: {studyset.description}</h2>
      <h2>Total Flashcards: {studyset.total_flashcards}</h2>
      
      <CreateFlashcards/>
    </div>
  );
}

export default ViewSingleStudyset;
