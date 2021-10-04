import React, { useEffect } from "react";
import TitleHeader from "./features/user/TitleHeader";
import Homepage from "./features/Homepage";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchSavedStudysets } from "./features/savedStudysets/savedStudysetsSlice";
import { fetchSavedFlashcards } from "./features/flashcards/savedFlashcardsSlice";

// COMMANDS THAT WE NEED TO RUN
// npm install semantic-ui-react semantic-ui-css
// npm install react-router-dom
// rails db:migrate
// deploying!
//brew tap heroku/brew && brew install heroku
//heroku git:remote -a yi-brainstormers
//heroku run rails db:migrate db:seed

// npm install --prefix client
// npm start --prefix client
// bundle install
// rails s

// console.log = console.warn = console.error = () => {};

//import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "redux-thunk";
// npm install redux-thunk
//npm install react-redux

// npm install redux-devtools-extension
//npm install @reduxjs/toolkit

function App() {
  const dispatch = useDispatch();

  // Intialize redux store here.
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSavedStudysets());
    dispatch(fetchSavedFlashcards());
  });

  return (
    <div>
      <TitleHeader />
      <Homepage />
    </div>
  );
}

export default App;

