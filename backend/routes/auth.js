const express = require("express");
const router = express.Router();

const { generateToken, unlock } = require("../controllers/authController");

router.post("/generate-token", generateToken);
router.post("/unlock", unlock);

module.exports = router;

