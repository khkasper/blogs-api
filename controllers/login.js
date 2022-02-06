const rescue = require('express-rescue');
const { OK } = require('../utils/statusCodes');
const UserService = require('../services/login');

const login = rescue(async (req, res) => {
  const { email } = req.body;
  const token = await UserService.login({ email });
  return res.status(OK).json({ token });
});

module.exports = {
  login,
};