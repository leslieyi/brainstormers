import SavedStudysetCard from "./SavedStudysetCard";

function SavedStudysetsContainer({ reviewsets, toggleSave, user }) {
  return (
    <div   style={{
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop: "100px",
        paddingRight: "50px",
        paddingLeft: "50px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
        // backgroundColor: "hsla(209, 49%, 50%, 0.59)"
      }}>
      <h1>Saved Studysets</h1>
      {reviewsets.map((reviewset) => (
        <SavedStudysetCard
          reviewset={reviewset}
          toggleSave={toggleSave}
          user={user}
        />
      ))}
    </div>
  );
}

export default SavedStudysetsContainer;
