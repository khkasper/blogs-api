const express = require('express');

const { validate } = require('../middlewares');
const { login } = require('../schemas');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/', validate(login), UserController.userLogin);

module.exports = router;