const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { BAD_REQUEST } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: 'Invalid fields' };

const login = async (userData) => {
  const { email } = userData;
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) throw ERROR_400;

  const token = generateToken({ email });
  return token;
};

module.exports = {
  login,
};