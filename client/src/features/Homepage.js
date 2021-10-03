import Auth from "./user/Auth";
import StudysetsContainer from "./studyset/StudysetsContainer";
import StudysetForm from "./studyset/StudysetForm";
import { Route, Switch } from "react-router-dom";
import FlashcardsContainer from "./FlashcardsContainer";
import { useEffect, useState } from "react";
import SavedFlashcards from "./SavedFlashcards";
import SavedStudysetsContainer from "./SavedStudysetsContainer";
import Profile from "./user/Profile";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./user/userSlice";

function Homepage() {
  const [reviewcards, setReviewcards] = useState([]);
  const [reviewsets, setReviewsets] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) setReviewsets([]);
    fetch("/reviewsets")
      .then((r) => r.json())
      .then((data) => setReviewsets(data));
  }, [user]);

  useEffect(() => {
    if (!user) setReviewcards([]);
    fetch("/reviewcards")
      .then((r) => r.json())
      .then((data) => setReviewcards(data));
  }, [user]);

  const toggleSave = (studysetId) => {
    const deleting = reviewsets.find((card) => card.studyset.id === studysetId);
    if (deleting) {
      fetch(`/reviewsets/${deleting.id}`, {
        method: "DELETE",
      }).then(() => {
        setReviewsets(reviewsets.filter((item) => item.id !== deleting.id));
      });
    } else {
      fetch("/reviewsets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studyset_id: studysetId, user_id: user.id }),
      })
        .then((r) => r.json())
        .then((data) => {
          setReviewsets([...reviewsets, data]);
        });
    }
  };

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
          <StudysetsContainer
            mine={false}
            reviewsets={reviewsets}
            setReviewsets={setReviewsets}
            key="all"
          />
        </Route>

        <Route exact path="/my-studysets">
          <StudysetsContainer
            mine={true}
            reviewsets={reviewsets}
            setReviewsets={setReviewsets}
            key="mine"
          />
        </Route>

        <Route path="/my-studysets/:id">
          <FlashcardsContainer
            mine={true}
            reviewcards={reviewcards}
            setReviewcards={setReviewcards}
            toggleStar={toggleStar}
            toggleSave={toggleSave}
            reviewsets={reviewsets}
          />
        </Route>

        <Route path="/studysets/:id">
          <FlashcardsContainer
            mine={false}
            reviewcards={reviewcards}
            setReviewcards={setReviewcards}
            toggleStar={toggleStar}
            toggleSave={toggleSave}
            reviewsets={reviewsets}
          />
        </Route>

        <Route path="/create-studysets">
          <StudysetForm />
        </Route>

        <Route exact path="/saved-flashcards">
          <SavedFlashcards reviewcards={reviewcards} toggleStar={toggleStar} />
        </Route>

        <Route exact path="/saved-studysets">
          <SavedStudysetsContainer reviewsets={reviewsets} />
        </Route>

        <Route exact path="/my-profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
