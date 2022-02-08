const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { CONFLICT, NOT_FOUND } = require('../utils/statusCodes');

const ERROR_404 = { code: NOT_FOUND, message: 'User does not exist' };
const ERROR_409 = { code: CONFLICT, message: 'User already registered' };

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) throw ERROR_409;

  await User.create({ displayName, email, password, image });
  const token = generateToken({ email });
  return token;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) throw ERROR_404;

  return user;
};

const remove = async (email) => User.destroy({ where: { email } });

module.exports = {
  create,
  getAll,
  getById,
  remove,
};