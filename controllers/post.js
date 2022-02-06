const rescue = require('express-rescue');
const { CREATED } = require('../utils/statusCodes');
const PostService = require('../services/post');

const create = rescue(async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { userId } = req;
  const post = await PostService.create({ title, content, categoryIds, userId });
  return res.status(CREATED).json(post);
});

module.exports = {
  create,
};