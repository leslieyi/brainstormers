import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      setUser(null);
      history.push("/");
    });
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "grey" }}
      >
        Menu
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Fade}
      >
        <NavLink
          exact
          to="/"
          style={{ color: "grey" }}
          activeStyle={{ color: "black" }}
        >
          <MenuItem>Home</MenuItem>
        </NavLink>

        <NavLink
          to="/my-studysets"
          style={{ color: "grey" }}
          activeStyle={{ color: "black" }}
        >
          <MenuItem>My Studysets</MenuItem>
        </NavLink>

        <NavLink
          to="/create-studysets"
          style={{ color: "grey" }}
          activeStyle={{ color: "black" }}
        >
          <MenuItem>Create Studysets</MenuItem>
        </NavLink>

        <NavLink
          to="/review-later-studysets"
          style={{ color: "grey" }}
          activeStyle={{ color: "black" }}
        >
          <MenuItem>Review Later</MenuItem>
        </NavLink>

        <MenuItem onClick={handleLogout} style={{ color: "grey" }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
