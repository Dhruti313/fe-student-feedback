import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();

  // Determine if the navbar should be shown based on the current path
  const showNavbar =
    location.pathname.includes("/feedback-status") ||
    location.pathname.includes("/create-survey");

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
        <Typography variant="h6">Feedback System</Typography>
      </Toolbar>
    </AppBar>
  ) : null;
};

export default Navbar;
