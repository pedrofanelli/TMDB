const jwt = require("jsonwebtoken");

const SECRET = "DFeX9Fi2vphd0FNHXePPNClAmw/exAIDCARlVwevii4=";

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  const result = jwt.verify(token, SECRET);
  return result;
};

module.exports = { generateToken, validateToken };