import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "80px",
        height: "100vh",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        position: "fixed", // Keeps it stuck to the left
        left: 0,
        top: 0,
      }}
    >
      {/* Profile Picture */}
      <Avatar sx={{ width: 50, height: 50, marginBottom: 2 }} />

      {/* User Info */}
      <Typography variant="body2">Your Name</Typography>
      <Typography variant="caption">Age</Typography>

      {/* Navigation Links */}
      <Box sx={{ marginTop: 4 }}>
        <InfoIcon sx={{ fontSize: 30, marginBottom: 2, cursor: "pointer" }} />
        <AccountCircleIcon sx={{ fontSize: 30, cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

export default Navbar;
