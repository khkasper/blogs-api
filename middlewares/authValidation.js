const verifyToken = require('../utils/verifyToken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};