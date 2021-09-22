import React, { useEffect, useState } from "react";
import TitleHeader from "./TitleHeader"
import Homepage from "./Homepage"

// import './App.css';

  // COMMANDS THAT WE NEED TO RUN
  // npm install --prefix client
  // npm install semantic-ui-react semantic-ui-css
  // npm install react-router-dom
  // npm start --prefix client
  // rails db:migrate
  // deploying!
  //brew tap heroku/brew && brew install heroku
  //heroku git:remote -a yi-brainstormers
  //heroku run rails db:migrate db:seed



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <TitleHeader user={user} setUser={setUser}/>
      <Homepage user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
//Testing
