const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: 'Invalid fields' };
const ERROR_404 = { code: NOT_FOUND, message: 'User does not exist' };
const ERROR_409 = { code: CONFLICT, message: 'User already registered' };

const createUser = async (userData) => {
  const { id, email } = userData;
  const userIsFound = await User.findOne({ where: { email } });

  if (userIsFound) throw ERROR_409;

  await User.create(userData);
  const token = generateToken({ id, email });
  return token;
};

const userLogin = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email, password } });

  if (!user) throw ERROR_400;

  const token = generateToken({ email, password });
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) throw ERROR_404;

  return user;
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
};