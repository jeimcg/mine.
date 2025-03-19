import React, { useState } from "react";
import { Box, Typography, Slider, TextField, Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NsfwSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [hornyScale, setHornyScale] = useState(5);
  const [fantasy, setFantasy] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: 2,
        backgroundColor: "#222",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        margin: "20px auto",
      }}
    >
      {/* Expand/Collapse Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6">NSFW Section</Typography>
        <IconButton sx={{ color: "#fff" }}>
          <ExpandMoreIcon
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </IconButton>
      </Box>

      {/* Expandable Content */}
      {expanded && (
        <Box sx={{ marginTop: 2 }}>
          {/* Horny Scale Slider with Visible Numbers */}
          <Typography gutterBottom>Horny Scale</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#fff" }}>0</Typography>
            <Slider
              value={hornyScale}
              onChange={(e, newValue) => setHornyScale(newValue)}
              min={0}
              max={10}
              step={1}
              marks
              valueLabelDisplay="on"
              sx={{
                width: "80%",
                "& .MuiSlider-markLabel": { color: "#fff" }, // Makes scale numbers visible
              }}
            />
            <Typography sx={{ color: "#fff" }}>10</Typography>
          </Box>

          {/* Fantasy Text Field */}
          <TextField
            label="penny for ur thots?"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={fantasy}
            onChange={(e) => setFantasy(e.target.value)}
            sx={{ marginTop: 2, backgroundColor: "#fff", borderRadius: 1 }}
          />

          {/* NSFW Submit Button (Centered) */}
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 2 }}>
            <Button variant="contained" color="secondary">
              Submit NSFW
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NsfwSection;
