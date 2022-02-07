const verifyToken = require('../utils/verifyToken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const { email } = verifyToken(authorization);
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};