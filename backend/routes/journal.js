const express = require("express");
const router = express.Router();

const {
    createJournalEntry,
    getAllJournalEntries,
    getJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
} = require("../controllers/journalController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createJournalEntry);
router.get("/:id", verifyToken, getJournalEntry);
router.get("/", verifyToken, getAllJournalEntries);
router.put("/:id", verifyToken, updateJournalEntry);
router.delete("/:id", verifyToken, deleteJournalEntry);

module.exports = router;