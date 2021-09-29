import FlashcardCard from "./FlashcardCard";

function SavedFlashcards({ reviewcards, toggleStar }) {
  return (
    <div>
      <h1>Review Flashcards</h1>
      {reviewcards.map((reviewcard) => (
        <FlashcardCard
          flashcard={reviewcard.flashcard}
          reviewcards={reviewcards}
          toggleStar={toggleStar}
          key={reviewcard.id}
        />
      ))}
    </div>
  );
}

export default SavedFlashcards;
