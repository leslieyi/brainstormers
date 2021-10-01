import { useHistory, NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

function Navbar({ setUser }) {
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
      <Menu secondary>
        <Menu.Item>
          <NavLink
            exact
            to="/"
            style={{ color: "#98C3EC" }}
            activeStyle={{
              color: "#0353A4",
              fontWeight: "bold",
            }}
          >
            <Icon name="home" />
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink
            to="/my-studysets"
            style={{ color: "#98C3EC" }}
            activeStyle={{
              color: "#0353A4",
              fontWeight: "bold",
            }}
          >
            <Icon name="book" />
            My Studysets
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink
            to="/create-studysets"
            style={{ color: "#98C3EC" }}
            activeStyle={{
              color: "#0353A4",
              fontWeight: "bold",
            }}
          >
            <Icon name="compose" />
            Create Studysets
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink
            to="/saved-studysets"
            style={{ color: "#98C3EC" }}
            activeStyle={{
              color: "#0353A4",
              fontWeight: "bold",
            }}
          >
            <Icon name="th list" />
            Saved Studysets
          </NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink
            to="/saved-flashcards"
            style={{ color: "#98C3EC" }}
            activeStyle={{
              color: "#0353A4",
              fontWeight: "bold",
            }}
          >
            <Icon name="th" />
            Starred Flashcards
          </NavLink>
        </Menu.Item>

        <Menu.Menu position="right" style={{ marginRight: "20px" }}>
          <Menu.Item>
            <NavLink
              to="/my-profile"
              style={{ color: "#98C3EC" }}
              activeStyle={{
                color: "#0353A4",
                fontWeight: "bold",
              }}
            >
              <Icon name="user circle" />
              Profile
            </NavLink>
          </Menu.Item>

          <Menu.Item onClick={handleLogout} style={{ color: "#98C3EC" }}>
            <Icon name="power off" />
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
