import ViewToggleFlashcard from "./ViewToggleFlashcard";

function ReviewLater({ reviewcards, toggleStar }) {
  return (
    <div>
      <h1>Review Cards</h1>
      {reviewcards.map((reviewcard) => (
        <ViewToggleFlashcard
          flashcard={reviewcard.flashcard}
          reviewcards={reviewcards}
          toggleStar={toggleStar}
          key={reviewcard.id}
        />
      ))}
    </div>
  );
}

export default ReviewLater;
