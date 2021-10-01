import { Segment } from "semantic-ui-react";
function Profile({user}) {
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
    </Segment>
  );
}
export default Profile;
