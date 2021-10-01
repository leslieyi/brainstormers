import { useState } from "react";
import SavedStudysetCard from "./SavedStudysetCard";
import SideLogo from "./photos/logo-only.png";

import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

import { Segment, Input, Popup } from "semantic-ui-react";
import { motion } from "framer-motion";

function SavedStudysetsContainer({ reviewsets, toggleSave, user }) {
  const [search, setSearch] = useState("");
  const [sortedReviewsets, setSortedReviewsets] = useState(false);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const handleSort = () => {
    setSortedReviewsets(!sortedReviewsets);
    console.log("hi");
  };

  const searchedData = reviewsets.filter(
    (item) =>
      item.studyset.title.toLowerCase().includes(search.toLowerCase()) ||
      item.studyset.description.toLowerCase().includes(search.toLowerCase()) ||
      item.studyset.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = sortedReviewsets
    ? [...searchedData].sort((a, b) =>
        a.studyset.title < b.studyset.title ? -1 : 1
      )
    : searchedData;

  return (
    <Segment
      raised
      style={{
        margin: "30px 100px 30px 100px",
        border: "2px solid #0353A4",
        opacity: "0.8",
      }}
    >
      <div style={{ margin: "20px" }}>
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Saved Studysets
        </h1>
        <Link to="/create-studysets">
          &nbsp;&nbsp;&nbsp;&nbsp;Make a Studyset
        </Link>

        <motion.img
          src={SideLogo}
          style={{ maxWidth: "5%", float: "right" }}
          drag
          dragTransition={{
            min: 0,
            max: 50,
            bounceStiffness: 120,
          }}
        />
        <br />
        <h1
          style={{
            display: "inline-block",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Sort in Alphabetical Order
        </h1>
        <Popup
          content="Sort Alphabetically"
          trigger={<Switch onClick={handleSort} size="small" />}
        />
        <Input onChange={handleSearch} placeholder="Start Typing to Search" />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "20px",
        }}
      >
        {sortedData.map((reviewset) => (
          <SavedStudysetCard
            reviewset={reviewset}
            toggleSave={toggleSave}
            user={user}
          />
        ))}
      </div>
    </Segment>
  );
}

export default SavedStudysetsContainer;
