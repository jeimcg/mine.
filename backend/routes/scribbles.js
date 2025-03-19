router.post("/", async (req, res) => {
    try {
        const { journalEntryId, image } = req.body;
        if (!journalEntryId || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newScribble = new Scribble({ journalEntryId, image });
        await newScribble.save();
        res.status(201).json(newScribble);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});