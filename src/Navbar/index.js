import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Home as HomeIcon, LogoutRounded } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();

  const showNavbar =
    location.pathname.includes("/feedbackStatus") ||
    location.pathname.includes("/feedbackQuestion");

  return showNavbar ? (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="/login"
          edge="start"
          color="inherit"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Feedback System
        </Typography>
        {location.pathname.includes("/feedbackStatus") && (
          <Button
            component={Link}
            to="/feedbackQuestion"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            Add Question
          </Button>
        )}
        {location.pathname.includes("/feedbackQuestion") && (
          <Button
            component={Link}
            to="/feedbackStatus"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            Feedback
          </Button>
        )}
        <IconButton
          component={Link}
          to="/login"
          edge="start"
          color="inherit"
          aria-label="home"
        >
          <LogoutRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  ) : null;
};

export default Navbar;
