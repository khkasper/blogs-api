require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }

  const { email } = payload;

  req.email = email;

  next();
};