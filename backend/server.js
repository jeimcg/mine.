const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const config = require("./config/config");

const app = express();
app.use(express.json());
app.use(cors());
// connecting to mongodb
mongoose.connect(config.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
const journalRoutes = require("./routes/journal");

// routing using routes module

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

// listening-starting the server
app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));