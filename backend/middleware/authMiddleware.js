const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.verifyToken = (req, res, next) => {
    console.log("Bypassing authentication for testing");
        next();
};