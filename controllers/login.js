const rescue = require('express-rescue');
const { OK } = require('../utils/statusCodes');
const LoginService = require('../services/login');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await LoginService.login({ email, password });
  return res.status(OK).json({ token });
});

module.exports = {
  login,
};