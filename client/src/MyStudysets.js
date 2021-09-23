import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MyStudysets() {
  const [studysetsData, setStudysetsData] = useState([]);

  useEffect(() => {
    fetch("/my_studysets").then((r) => {
      if (r.ok) {
        r.json().then((data) => setStudysetsData(data));
      }
    });
  }, []);

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
      
      <h1>View My Studysets</h1>{" "}
      <Link to="/create-studysets">Make a Studyset</Link>
      {studysetsData.map((studyset) => (
        <div
          key={studyset.id}
          style={{
            border: "1px solid black",
            width: "50%",
            display: "flexbox",
          }}
        >
          <Link to={`/my-studysets/${studyset.id}`}>
            <div>{studyset.title}</div>
          </Link>
        </div>
      ))}
    
    </div>
  );
}

export default MyStudysets;
