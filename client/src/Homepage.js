import Auth from "./Auth";
import Main from "./Main";
import MyStudysets from "./MyStudysets";
import CreateStudysets from "./CreateStudysets ";
import ViewSingleStudyset from "./ViewSingleStudyset"
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";


function Homepage({ user, setUser }) {
  const [studysetsData, setStudysetsData] = useState([]);

  useEffect(() => {
    fetch("/all-my-studysets").then((r) => {
      if (r.ok) {
        r.json().then((data) => setStudysetsData(data));
      }
    });
  }, []);

  if (!user) return <Auth user={user} onLogin={setUser} />;

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route  exact path="/my-studysets">
            <MyStudysets studysetsData={studysetsData}/>
        </Route>

        <Route  exact path= {`/my-studysets/${studysetsData.id}`} >
            <ViewSingleStudyset/>
        </Route>

        <Route exact path="/create-studysets" >
          <CreateStudysets />
        </Route>

      </Switch>
    </div>
  );
}

export default Homepage;
