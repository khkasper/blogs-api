const { BlogPost, Category, User } = require('../models');
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require('../utils/statusCodes');

const ERROR_400_1 = { code: BAD_REQUEST, message: '"categoryIds" not found' };
const ERROR_400_2 = { code: BAD_REQUEST, message: 'Categories cannot be edited' };
const ERROR_401 = { code: UNAUTHORIZED, message: 'Unauthorized user' };
const ERROR_404 = { code: NOT_FOUND, message: 'Post does not exist' };

const create = async ({ title, content, categoryIds, email }) => {
  const categoryValidation = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));

  if (categoryValidation.includes(null)) throw ERROR_400_1;

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

const update = async ({ title, content, categoryIds }, email, id) => {
  if (categoryIds) throw ERROR_400_2;

  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });
  const { userId: postUserId } = await BlogPost.findOne({ where: { id } });

  if (userId !== postUserId) throw ERROR_401;

  await BlogPost.update({ title, content }, { where: { id } });
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const remove = async (email, id) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) throw ERROR_404;

  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });
  const { userId: postUserId } = await BlogPost.findOne({ where: { id } });

  if (userId !== postUserId) throw ERROR_401;

  const removed = await BlogPost.destroy({ where: { id } });
  return removed;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};