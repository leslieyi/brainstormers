import Auth from "./Auth";
import Main from "./Main";
import Studysets from "./Studysets";

import { Route, Switch } from "react-router-dom";

function Homepage({ user, setUser }) {
  if (!user) return <Auth user={user} onLogin={setUser} />;

  return (
    <div>
      <h2>Hi from Homepage</h2>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route>
            <Studysets exact path="/my-studysets"/>
        </Route>

        <Route>
            {/* <Studysets exact path="/studysets"/> */}
        </Route>


      </Switch>
    </div>
  );
}

export default Homepage;
