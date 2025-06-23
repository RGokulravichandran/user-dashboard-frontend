import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = () => {
  const user = null; // Replace with actual user state
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "10px 20px", sm: "10px 50px" },
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h4" align="center">
          User Dashboard
        </Typography>
      </Link>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: { xs: "auto", sm: "400px" } }}
      >
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <Avatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user.result.name}</Typography>
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
