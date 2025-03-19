const JournalEntry = require("../models/journalEntry");

exports.createJournalEntry = async (req, res) => { // creating post function for new journal
    try {
        const entry = new JournalEntry(req.body);
        await entry.save();
        res.status(201).json(entry);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJournalEntry = async (req, res) => { // creating fetch function for existing journals
    try {
        const entry = await JournalEntry.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Entry not found" });
        res.json(entry);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJournalEntries = async (req, res) => { // creating fetch function for existing journals
    try {
        const entry = await JournalEntry.find();
        res.json(entry);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateJournalEntry = async (req, res) => { // update function for existing journals
    try {
        const updatedEntry = await JournalEntry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEntry) return res.status(404).json({ message: "Entry not found"});
        res.json(updatedEntry);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJournalEntry = async (req, res) => { // delete function for journals
    try {
        const deletedEntry = await JournalEntry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
        res.json({ message: "Entry deleted successfully" });
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveScribble = async (req, res) => { // function to save scribbles
    try {
        const { image } = req.body; // Get the Base64 image from request
        const { id } = req.params; // Get the journal entry ID

        // Find the journal entry
        const entry = await JournalEntry.findById(id);
        if (!entry) return res.status(404).json({ message: "Journal entry not found" });

        // Update the scribble field
        entry.scribble = image;
        await entry.save();

        res.json({ message: "Scribble saved successfully", entry });
    } catch (error) {
        console.error("Error saving scribble:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
