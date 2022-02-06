require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

module.exports = (data) => jwt.sign(data, process.env.JWT_SECRET, jwtConfig);