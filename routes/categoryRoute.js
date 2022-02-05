const express = require('express');

const { validate, authValidation } = require('../middlewares');
const { category } = require('../schemas');
const CategoryController = require('../controllers/category');

const router = express.Router();

router
  .get('/', authValidation, CategoryController.getAllCategories)
  .post('/', authValidation, validate(category), CategoryController.createCategory);

module.exports = router;