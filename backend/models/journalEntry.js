const mongoose = require("mongoose"); // initializing mongoose as module

const NsfwSchema = new mongoose.Schema({ // creating subdoc schema for nsfw INSIDE main journal entries
    hornyScale: { type: Number, min: 0, max: 10, default: null }, // null when not used
    fantasy: { type: String, default: "" },
}, { _id: false }); // prevents unnecessary _id

const ScribbleSchema = new mongoose.Schema({
    image: { type: String, default: "" }, // Base64-encoded image
    createdAt: { type: Date, default: Date.now },
}, { _id: false });

const JournalEntrySchema = new mongoose.Schema({ // creating database schema for main journal entries
    title: { type: String, required: true },
    body: { type: String, required: true },
    song: { type: String, default: "" },
    arousalQuotient: { type: Number, min: -1, max: 1 },
    nsfw: NsfwSchema, // stored as sub schema
    scribble: ScribbleSchema, // also stored as subschema
    createdAt: { type: Date, default: Date.now },    
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema); // exporting as module