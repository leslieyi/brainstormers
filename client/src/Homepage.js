import Auth from "./Auth";
import Main from "./Main";
import MyStudysets from "./MyStudysets";
import CreateStudysets from "./CreateStudysets ";
import { Route, Switch } from "react-router-dom";
import ViewOneStudyset from "./ViewOneStudyset";

function Homepage({ user, setUser }) {


  if (!user) return <Auth user={user} onLogin={setUser} />;

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/my-studysets">
          <MyStudysets />
        </Route>

        <Route path="/my-studysets/:id">
          <ViewOneStudyset />
        </Route>

        <Route path="/create-studysets">
          <CreateStudysets />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
