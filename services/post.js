const { BlogPost, Category, User } = require('../models');
const { BAD_REQUEST } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: '"categoryIds" not found' };

const create = async ({ title, content, categoryIds, email }) => {
  const categoryValidation = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));

  if (categoryValidation.includes(null)) throw ERROR_400;

  const { id: userId } = await User.findOne({ where: { email } });
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return allPosts;
};

module.exports = {
  create,
  getAll,
};