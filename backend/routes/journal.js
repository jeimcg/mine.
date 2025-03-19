const express = require("express");
const router = express.Router();

const {
    createJournalEntry,
    getAllJournalEntries,
    getJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    saveScribble
} = require("../controllers/journalController");

router.post("/", createJournalEntry);
router.get("/:id", getJournalEntry);
router.get("/", getAllJournalEntries);
router.put("/:id", updateJournalEntry);
router.delete("/:id", deleteJournalEntry);
router.patch("/:id/scribble", saveScribble); async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ message: "Scribble image is required" });
        }

        const journalEntry = await JournalEntry.findbyId(req.params.id);
        if (!journalEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        journalEntry.scribble = { image, createdAt: new Date() };
        await journalEntry.save

        res.json(journalEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = router;