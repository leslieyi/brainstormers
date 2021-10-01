import FlashcardCard from "./FlashcardCard";
import { Segment } from "semantic-ui-react";

function SavedFlashcards({ reviewcards, toggleStar }) {
  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <h1>Review Flashcards</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "20px",
        }}
      >
        {reviewcards.map((reviewcard) => (
          <FlashcardCard
            flashcard={reviewcard.flashcard}
            reviewcards={reviewcards}
            toggleStar={toggleStar}
            key={reviewcard.id}
          />
        ))}
      </div>
    </Segment>
  );
}

export default SavedFlashcards;
