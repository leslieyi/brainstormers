import Auth from "./Auth";
import StudysetsContainer from "./StudysetsContainer";
import StudysetForm from "./StudysetForm";
import { Route, Switch } from "react-router-dom";
import FlashcardsContainer from "./FlashcardsContainer";
import { useEffect, useState } from "react";
import SavedFlashcards from "./SavedFlashcards";
import SavedStudysetsContainer from "./SavedStudysetsContainer";
import Profile from "./Profile";

function Homepage({ user, setUser }) {
  const [reviewcards, setReviewcards] = useState([]);
  const [reviewsets, setReviewsets] = useState([]);

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

  if (!user) return <Auth user={user} onLogin={setUser} />;

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <StudysetsContainer
            onlyMine={false}
            user={user}
            reviewsets={reviewsets}
            setReviewsets={setReviewsets}
            key="all"
          />
        </Route>

        <Route exact path="/my-studysets">
          <StudysetsContainer
            onlyMine={true}
            user={user}
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
          <SavedStudysetsContainer user={user} reviewsets={reviewsets} />
        </Route>

        <Route exact path="/my-profile">
          <Profile user={user} reviewsets={reviewsets} />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
