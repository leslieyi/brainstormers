import Auth from "./user/Auth";
import Profile from "./user/Profile";
import StudysetsContainer from "./studyset/StudysetsContainer";
import StudysetForm from "./studyset/StudysetForm";
import FlashcardsContainer from "./flashcards/FlashcardsContainer";
import SavedFlashcards from "./flashcards/SavedFlashcards";
import SavedStudysetsContainer from "./savedStudysets/SavedStudysetsContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./user/userSlice";

function Homepage() {
  const [reviewcards, setReviewcards] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) setReviewcards([]);
    fetch("/reviewcards")
      .then((r) => r.json())
      .then((data) => setReviewcards(data));
  }, [user]);

  const toggleStar = (flashcardId) => {
    const deleting = reviewcards.find(
      (card) => card.flashcard.id === flashcardId
    );
    if (deleting) {
      fetch(`/reviewcards/${deleting.id}`, {
        method: "DELETE",
      }).then(() => {
        setReviewcards(reviewcards.filter((item) => item.id !== deleting.id));
      });
    } else {
      fetch("/reviewcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcard_id: flashcardId, user_id: user.id }),
      })
        .then((r) => r.json())
        .then((data) => {
          setReviewcards([...reviewcards, data]);
        });
    }
  };

  if (!user) return <Auth />;

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>

        <Route exact path="/signup">
          <Redirect to="/" />
        </Route>

        <Route exact path="/">
          <StudysetsContainer mine={false} key="all" />
        </Route>

        <Route exact path="/my-studysets">
          <StudysetsContainer mine={true} key="mine" />
        </Route>

        <Route path="/my-studysets/:id">
          <FlashcardsContainer mine={true} />
        </Route>

        <Route path="/studysets/:id">
          <FlashcardsContainer mine={false} />
        </Route>

        <Route path="/create-studysets">
          <StudysetForm />
        </Route>

        <Route exact path="/saved-flashcards">
          <SavedFlashcards reviewcards={reviewcards} toggleStar={toggleStar} />
        </Route>

        <Route exact path="/saved-studysets">
          <SavedStudysetsContainer />
        </Route>

        <Route exact path="/my-profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
