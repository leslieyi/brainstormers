import { useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import FlashcardCard from "./FlashcardCard";
import { selectSavedFlashcards } from "./savedFlashcardsSlice";

function SavedFlashcards({ reviewcards, toggleStar }) {

  const savedFlashcards = useSelector(selectSavedFlashcards)
  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <div style={{ margin: "20px" }}>
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Review Flashcards
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "20px",
        }}
      >
        {savedFlashcards.map((savedFlashcard) => (
          <FlashcardCard
            flashcard={savedFlashcard.flashcard}
            savedFlashcards={savedFlashcards}
            key={savedFlashcard.id}
          />
        ))}
      </div>
    </Segment>
  );
}

export default SavedFlashcards;
