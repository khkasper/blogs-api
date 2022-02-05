require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

module.exports = (token) => jwt.verify(token, process.env.JWT_SECRET, jwtConfig);
