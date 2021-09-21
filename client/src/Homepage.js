import Auth from "./Auth"
import Main from "./Main"

import { Route } from "react-router-dom";


function Homepage({user, setUser}){
    if (!user)
    return (
        <Auth user={user} onLogin={setUser}/>
    );


    return(
        <div>

            <h2>Hi from Homepage</h2>
            <Route exact path="/">
                <Main/>
            </Route>
        </div>

    )
}

export default Homepage;