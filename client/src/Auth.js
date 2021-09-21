import { Link, Switch, Route } from "react-router-dom";
import Signup from "./Signup"
import Login from "./Login"

function Auth({user, onLogin}){
    return(


        <div>
            <>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/signup">Signup</Link>
            </>
            
        <Switch>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin} user={user} />
          </Route>
        </Switch>
      </div>
    )
}

export default Auth;