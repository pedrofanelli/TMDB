
const { validateToken } = require("../config/tokens");

function validateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
  
    const payload  = validateToken(token);
    if (!payload) return res.sendStatus(401);
    req.user = payload;
    next();
  }
  
  module.exports = { validateUser };