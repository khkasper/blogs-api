const express = require('express');

const { authValidation, validate } = require('../middlewares');
const { user } = require('../schemas');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', authValidation, UserController.getAllUsers);
router.post('/', validate(user), UserController.createUser);

module.exports = router;