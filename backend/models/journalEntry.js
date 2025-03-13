const mongoose = require("mongoose"); // initializing mongoose as module

const JournalEntrySchema = new mongoose.Schema({ // creating database schema
    title: { type: String, required: true },
    body: { type: String, required: true },
    song: { type: String, default: "" },
    arousalQuotient: { type: Number, min: 0, max: 1 },
    nsfw: { 
        hornyScale: { type: Number, min: 0, max: 10 },
        fantasy: { type: String, default: "" },
     },
     createdAt: { type: Date, default: Date.now },    
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema); // exporting as module