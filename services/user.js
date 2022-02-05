const tokenGenerator = require('../utils/tokenGenerator');
const { User } = require('../models');
const { CONFLICT } = require('../utils/statusCodes');

const ERROR_409 = { code: CONFLICT, message: 'User already registered' };

const createUser = async (userData) => {
  const { email } = userData;
  const userIsFound = await User.findOne({ where: { email } });

  if (userIsFound) throw ERROR_409;

  await User.create(userData);
  const token = tokenGenerator(userData);
  return token;
};

module.exports = {
  createUser,
};