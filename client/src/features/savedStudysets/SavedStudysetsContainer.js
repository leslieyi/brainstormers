import { useState, useEffect } from "react";
import SavedStudysetCard from "./SavedStudysetCard";
import SideLogo from "../../photos/logo-only.png";

import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

import { Segment, Input, Popup } from "semantic-ui-react";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import {
  selectSavedStudysets,
  fetchSavedStudysets,
} from "./savedStudysetsSlice";

function SavedStudysetsContainer() {
  const dispatch = useDispatch();
  const savedStudysets = useSelector(selectSavedStudysets);

  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);

  const refresh = () => {
    dispatch(fetchSavedStudysets({ sorted }));
  };

  useEffect(refresh, [sorted]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const handleSort = () => {
    setSorted(!sorted);
  };

  const searchedData = savedStudysets.filter(
    (item) =>
      item.studyset.title.toLowerCase().includes(search.toLowerCase()) ||
      item.studyset.description.toLowerCase().includes(search.toLowerCase()) ||
      item.studyset.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = sorted
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
          <motion.p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              display: "inline-block",
              fontSize: "20px",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Make a Studyset
          </motion.p>
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
            fontSize: "25px",
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
        {sortedData.map((savedStudyset) => (
          <SavedStudysetCard
            key={savedStudyset.id}
            savedStudyset={savedStudyset}
          />
        ))}
      </div>
    </Segment>
  );
}

export default SavedStudysetsContainer;
