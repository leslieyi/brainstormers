import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateFlashcards from "./CreateFlashcards";
import ViewSingleFlashcard from "./ViewSingleFlashcard";

function ViewOneStudyset() {
  const { id } = useParams();

  const [studyset, setStudyset] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    fetch(`/my_studysets/${id}`)
      .then((r) => r.json())
      .then((data) => setStudyset(data));
    }, [id /*studyset.flashcards.length*/]);
    
    if (!studyset) return null;
  const onNewFlashcard = (flashcard) => {
    setStudyset({
      ...studyset,
      flashcards: [...studyset.flashcards, flashcard],
    });
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
    console.log(flashcard)
    // setToggleEdit(
    //   flashcardValue.id === "" || flashcard.id === flashcardValue.id 
    //   ? !toggleEdit 
    //   : toggleEdit)
    //   setFlashcardValue(flashcard)

  };

  


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
        <h4>Total Flashcards: {studyset.total_flashcards}</h4>
      </div>

      <CreateFlashcards
        toggleEdit={toggleEdit}
        onNewFlashcard={onNewFlashcard}
        studyset_id={studyset.id}
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
