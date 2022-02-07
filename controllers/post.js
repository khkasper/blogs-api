const rescue = require('express-rescue');
const { CREATED, OK } = require('../utils/statusCodes');
const PostService = require('../services/post');

const create = rescue(async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { userEmail: email } = req;
  const post = await PostService.create({ title, content, categoryIds, email });
  return res.status(CREATED).json(post);
});

const getAll = rescue(async (_req, res) => {
  const posts = await PostService.getAll();
  return res.status(OK).json(posts);
});

module.exports = {
  create,
  getAll,
};