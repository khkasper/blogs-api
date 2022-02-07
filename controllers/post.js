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

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await PostService.getById(id);
  return res.status(OK).json(post);
});

const update = rescue(async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { id } = req.params;
  const { userEmail: email } = req;
  const post = await PostService.update({ title, content, categoryIds }, email, id);
  return res.status(OK).json(post);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
};