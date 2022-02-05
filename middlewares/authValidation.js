require('dotenv').config();
const rescue = require('express-rescue');
const verifyToken = require('../utils/verifyToken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

module.exports = rescue(async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  const payload = verifyToken();

  if (!payload) return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });

  const { email } = payload;

  req.email = email;

  return next();
});