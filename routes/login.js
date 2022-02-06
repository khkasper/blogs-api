const express = require('express');

const { validate } = require('../middlewares');
const { login } = require('../schemas');
const LoginController = require('../controllers/login');

const router = express.Router();

router.post('/', validate(login), LoginController.login);

module.exports = router;