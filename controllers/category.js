const rescue = require('express-rescue');
const CategoryService = require('../services/category');
const { CREATED, OK } = require('../utils/statusCodes');

const createCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryService.createCategory({ name });
  return res.status(CREATED).json(category);
});

const getAllCategories = rescue(async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  return res.status(OK).json(categories);
});

module.exports = {
  createCategory,
  getAllCategories,
};