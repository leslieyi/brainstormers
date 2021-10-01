import { Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";


function Profile({user}) {
  function handleProfileEdit(){
    console.log("Edit was clicked!")
  }
  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <h1>Username: {user.username}</h1>
      <h1>Bio: {user.bio}</h1>
      <h1>Email: {user.email}</h1>
      <h1>You have created {user.studysets.length} studysets!</h1>
      <button onClick={handleProfileEdit}>Click here to edit profile</button>
    </Segment>
  );
}
export default Profile;
