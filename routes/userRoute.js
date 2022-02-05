const express = require('express');

const { validate } = require('../middlewares');
const { user } = require('../schemas');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/', validate(user), UserController.createUser);

module.exports = router;