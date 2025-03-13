const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (req, res) => {
  const token = jwt.sign({ access: true }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.unlock = (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, config.JWT_SECRET);
    res.json({ success: true, message: "Unlocked!" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
