const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(BAD_REQUEST).json({ message: err.details[0].message });
  }

  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};