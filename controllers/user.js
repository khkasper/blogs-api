const rescue = require('express-rescue');
const { CREATED, OK } = require('../utils/statusCodes');
const UserService = require('../services/user');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await UserService.createUser({ displayName, email, password, image });
  return res.status(CREATED).json({ token });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await UserService.userLogin({ email, password });
  return res.status(OK).json({ token });
});

const getAllUsers = rescue(async (_req, res) => {
  const users = await UserService.getAllUsers();
  return res.status(OK).json(users);
});

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
};