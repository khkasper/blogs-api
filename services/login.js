const argon2 = require('argon2');
const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { BAD_REQUEST, UNAUTHORIZED } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: 'Invalid fields' };
const ERROR_401 = { code: UNAUTHORIZED, message: 'Unauthorized' };

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw ERROR_400;

  const verified = await argon2.verify(user.password, password, { type: argon2.argon2id });
  let token;

  if (verified) {
    token = generateToken({ email });
  } else throw ERROR_401;

  return token;
};

module.exports = {
  login,
};