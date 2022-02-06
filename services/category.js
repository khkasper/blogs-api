const { Category } = require('../models');

const create = async (data) => {
  const { name } = data;
  const category = await Category.create({ name });
  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};