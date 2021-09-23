import { Link } from "react-router-dom";

function MyStudysets({studysetsData, setStudysetsData}) {

  return (
    <div
      style={{
        margin: "100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "50px",
        border: "4px solid black",
      }}
    >
      <h1>View My Studysets</h1> <Link to="/create-studysets">Make a Studyset</Link>

      {studysetsData.map((studyset) => (
        <div>
          <Link to={`/my-studysets/${studyset.id}`}><h1>{studyset.title}</h1></Link>
        </div>
      ))}

     
    </div>
  );
}

export default MyStudysets;
