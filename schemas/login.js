const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().empty().required(),
  password: Joi.string().empty().required(),
});