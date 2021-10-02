import React, { useEffect, useState } from "react";
import TitleHeader from "./features/TitleHeader";
import Homepage from "./features/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "./features/user/userSlice";

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
  const setUser = () => {
    throw new Error("Stop using setUser!");
  };
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Intialize redux store here.
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div>
      <TitleHeader user={user} setUser={setUser} />
      <Homepage user={user} setUser={setUser} />
    </div>
  );
}

export default App;
//Testing
