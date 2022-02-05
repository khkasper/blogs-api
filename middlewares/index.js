const errorMiddleware = require('./errorMiddleware');
const authValidation = require('./authValidation');
const validate = require('./validate');

module.exports = {
  errorMiddleware,
  authValidation,
  validate,
};