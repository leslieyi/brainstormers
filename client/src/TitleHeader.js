import { textAlign } from "@mui/system";
import Navbar from "./Navbar";
function TitleHeader({user, setUser}) {
  return (
    <div >
      <h1 style={{textAlign:"center"}}>Welcome to Brainstormers</h1>
      {user? (
          <Navbar user={user} setUser={setUser}/>
      ):null}
    </div>
  );
}

export default TitleHeader;
