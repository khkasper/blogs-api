const rescue = require('express-rescue');
const CategoryService = require('../services/category');
const { CREATED, OK } = require('../utils/statusCodes');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryService.create({ name });
  return res.status(CREATED).json(category);
});

const getAll = rescue(async (_req, res) => {
  const categories = await CategoryService.getAll();
  return res.status(OK).json(categories);
});

module.exports = {
  create,
  getAll,
};