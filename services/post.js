const { BlogPost, Category } = require('../models');
const { BAD_REQUEST } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: '"categoryIds" not found' };

const create = async ({ userId, title, categoryIds, content }) => {
  const categoryValidation = await Promise
    .all(categoryIds.map((id) => Category.findOne({ where: { id } })));

  if (categoryValidation.includes(null)) throw ERROR_400;

  const post = await BlogPost.create({ title, content, userId });
  return post;
};

module.exports = {
  create,
};