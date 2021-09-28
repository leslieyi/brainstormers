import Auth from "./Auth";
import AllStudysets from "./AllStudysets";
import CreateStudysets from "./CreateStudysets ";
import { Route, Switch } from "react-router-dom";
import ViewOneStudyset from "./ViewOneStudyset";
import { useEffect, useState } from "react";
import SavedFlashcards from "./SavedFlashcards";
import SavedStudysets from "./SavedStudysets";

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
    const deleting = reviewsets.find(
      (card) => card.studyset.id === studysetId
    );
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
          <AllStudysets onlyMine={false} user={user} key="all" />
        </Route>

        <Route exact path="/my-studysets">
          <AllStudysets onlyMine={true} user={user} key="mine" />
        </Route>

        <Route path="/my-studysets/:id">
          <ViewOneStudyset mine={true} reviewcards={reviewcards} toggleStar={toggleStar} />
        </Route>

        <Route path="/studysets/:id">
          <ViewOneStudyset mine={false} reviewcards={reviewcards} toggleStar={toggleStar} />
        </Route>

        <Route path="/create-studysets">
          <CreateStudysets />
        </Route>

        <Route exact path="/saved-flashcards">
          <SavedFlashcards
            reviewcards={reviewcards}
            toggleStar={toggleStar}
          />
        </Route>

        <Route exact path="/saved-studysets">
          <SavedStudysets
            user={user}
            reviewsets={reviewsets}
            toggleSave={toggleSave}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
