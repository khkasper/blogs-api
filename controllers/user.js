const rescue = require('express-rescue');
const { CREATED } = require('../utils/statusCodes');
const UserService = require('../services/user');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const token = await UserService.createUser({ displayName, email, password, image });

  if (token.error) next(token.error);

  return res.status(CREATED).json({ token });
});

module.exports = {
  createUser,
};