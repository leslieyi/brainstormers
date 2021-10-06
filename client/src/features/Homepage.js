import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import FlashcardsContainer from "./flashcards/FlashcardsContainer";
import SavedFlashcards from "./flashcards/SavedFlashcards";
import SavedStudysetsContainer from "./savedStudysets/SavedStudysetsContainer";
import StudysetForm from "./studyset/StudysetForm";
import StudysetsContainer from "./studyset/StudysetsContainer";
import Auth from "./user/Auth";
import MyProfile from "./user/MyProfile";
import { selectUser } from "./user/userSlice";

function Homepage() {
  const user = useSelector(selectUser);

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
          <SavedFlashcards />
        </Route>

        <Route exact path="/saved-studysets">
          <SavedStudysetsContainer />
        </Route>

        <Route exact path="/my-profile">
          <MyProfile />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
