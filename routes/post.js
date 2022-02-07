const express = require('express');

const { authValidation, validate } = require('../middlewares');
const { post } = require('../schemas');
const PostController = require('../controllers/post');

const router = express.Router();

router
  .get('/', authValidation, PostController.getAll)
  .post('/', authValidation, validate(post), PostController.create);

module.exports = router;