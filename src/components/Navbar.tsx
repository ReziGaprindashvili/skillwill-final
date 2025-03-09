import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="fixed" 
      sx={{
        backgroundColor: "#2E1A12", 
        padding: "10px 20px",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#FFF", textDecoration: "none" }}
          component={Link}
          to="/"
        >
          Photo Gallery
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography component={Link} to="/" sx={navLinkStyles}>
            HOME
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyles}>
            ABOUT
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navLinkStyles = {
  color: "#FFF",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  "&:hover": { color: "#A67B5B" },
};

export default Navbar;
