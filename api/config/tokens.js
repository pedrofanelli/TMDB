const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  const result = jwt.verify(token, SECRET);
  return result;
};

module.exports = { generateToken, validateToken };