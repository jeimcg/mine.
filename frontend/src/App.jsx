import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import axios from "axios";
import JournalEntryForm from "./components/JournalEntryForm";
import ValenceArousalGraph from "./components/ValenceArousalGraph";
import ScribblePad from "./components/ScribblePad";
import NSFWSection from "./components/NSFWSection";
import Navbar from "./components/Navbar";

const App = () => {
  const [nsfwData, setNsfwData] = useState({ 
    hornyScale: 0,
    fantasy: "" 
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex">
        {/* Navbar on the left */}
        <Navbar />

        {/* Main content area - Centers everything */}
        <Box 
          sx={{
            flexGrow: 1,        // Expands to take available space
            display: "flex",     // Uses flexbox
            flexDirection: "column", // Aligns children vertically
            alignItems: "center", // Centers horizontally
            justifyContent: "center", // Centers vertically
            height: "100%", // Full height of viewport
            paddingLeft: "500px", // Adjust to make space for the navbar
          }}
        >
          <JournalEntryForm />
          <ValenceArousalGraph />
          <ScribblePad />
          <NSFWSection nsfwData={nsfwData} setNsfwData={setNsfwData} /> 
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
