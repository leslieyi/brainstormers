import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MySingleStudyset from "./MySingleStudyset";

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
        marginRight: "100px",
        marginLeft: "100px",
        marginBottom: "200px",
        marginTop: "100px",
        paddingRight: "250px",
        paddingLeft: "250px",
        paddingTop: "50px",
        paddingBottom: "100px",
        border: "4px solid black",
      }}
    >
      <div>
        <h1 style={{ display: "inline" }}>View My Studysets</h1>{" "}
        <Link to="/create-studysets">Make a Studyset</Link>
      </div>

      {studysetsData.map((studyset) => (
        <MySingleStudyset studyset={studyset}/>
      ))}
    </div>
  );
}

export default MyStudysets;
