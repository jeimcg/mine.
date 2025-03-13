module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/emotionJournalDB",
    JWT_SECRET: process.env.JWT_SECRET || "change_this_secret_key",
};
