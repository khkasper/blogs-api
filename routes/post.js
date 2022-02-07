const express = require('express');

const { authValidation, validate } = require('../middlewares');
const { create, update } = require('../schemas/post');
const PostController = require('../controllers/post');

const router = express.Router();

router
  .get('/', authValidation, PostController.getAll)
  .get('/:id', authValidation, PostController.getById)
  .post('/', authValidation, validate(create), PostController.create)
  .put('/:id', authValidation, validate(update), PostController.update);

module.exports = router;