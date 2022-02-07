const { BlogPost, Category, User } = require('../models');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/statusCodes');

const ERROR_400 = { code: BAD_REQUEST, message: '"categoryIds" not found' };
const ERROR_404 = { code: NOT_FOUND, message: 'Post does not exist' };

const create = async ({ title, content, categoryIds, email }) => {
  const categoryValidation = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));

  if (categoryValidation.includes(null)) throw ERROR_400;

  const { id: userId } = await User.findOne({ where: { email } });
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) throw ERROR_404;

  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};