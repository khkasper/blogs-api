const rescue = require('express-rescue');
const { CREATED, OK } = require('../utils/statusCodes');
const UserService = require('../services/user');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await UserService.create({ displayName, email, password, image });
  return res.status(CREATED).json({ token });
});

const getAll = rescue(async (_req, res) => {
  const users = await UserService.getAll();
  return res.status(OK).json(users);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getById(id);
  return res.status(OK).json(user);
});

module.exports = {
  create,
  getAll,
  getById,
};