const rescue = require('express-rescue');
const CategoryService = require('../services/category');
const { CREATED } = require('../utils/statusCodes');

const createCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryService.createCategory({ name });
  return res.status(CREATED).json(category);
});

module.exports = {
  createCategory,
};