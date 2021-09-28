import Auth from "./Auth";
import Main from "./Main";
import MyStudysets from "./MyStudysets";
import CreateStudysets from "./CreateStudysets ";
import { Route, Switch } from "react-router-dom";
import ViewOneStudyset from "./ViewOneStudyset";
import ReviewLater from "./ReviewLater";
import { useEffect, useState } from "react";

function Homepage({ user, setUser }) {
  const [reviewcards, setReviewcards] = useState([]);
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

  if (!user) return <Auth user={user} onLogin={setUser} />;

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <MyStudysets onlyMine={false} user={user} key="all" />
        </Route>

        <Route exact path="/my-studysets">
          <MyStudysets onlyMine={true} user={user} key="mine" />
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

        <Route exact path="/review-later-studysets">
          <ReviewLater
            reviewcards={reviewcards}
            toggleStar={toggleStar}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
