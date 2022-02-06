const express = require('express');

const { authValidation, validate } = require('../middlewares');
const { user } = require('../schemas');
const UserController = require('../controllers/user');

const router = express.Router();

router
  .get('/', authValidation, UserController.getAll)
  .get('/:id', authValidation, UserController.getById)
  .post('/', validate(user), UserController.create);

module.exports = router;