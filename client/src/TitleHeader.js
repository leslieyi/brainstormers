import Navbar from "./Navbar";
function TitleHeader({ user, setUser }) {
  return (
    <div>
      {user ? (
        <>
          <h1 style={{ textAlign: "center" }}>
            Welcome {user.username}, to Brainstormers
          </h1>

          <Navbar user={user} setUser={setUser} />
        </>
      ) : null}
    </div>
  );
}

export default TitleHeader;
