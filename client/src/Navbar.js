import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

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
    console.log("hi");
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      // console.log(r);
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Link to="/my-studysets"><MenuItem>My Studysets</MenuItem></Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;