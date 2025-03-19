import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const JournalEntryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    song: "", // Optional field
  });

  // Handles input changes dynamically for title, body, and song
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:5000/api/journal", formData);
      console.log("Journal entry saved:", response.data);
      
      // Reset form after submission
      setFormData({ title: "", body: "", song: "" });
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 2,
        width: "100%",
        maxWidth: "400px",
        padding: 2,
        backgroundColor: "#222",
        borderRadius: 2,
        boxShadow: 3,
        margin: "20px auto",
      }}

    >
      <TextField
        label="Song"
        name="song"
        color="#fff"
        variant="outlined"
        value={formData.song}
        onChange={handleChange}
        placeholder="what song are u feeling like 2day? :) (optional)"
      />
      
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
        placeholder="title"
        required
      />
      
      <TextField
        label="Body"
        name="body"
        variant="outlined"
        multiline
        rows={6}
        value={formData.body}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Save Entry
      </Button>
    </Box>
  );
};

export default JournalEntryForm;
