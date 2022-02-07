require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

module.exports = (data) => jwt.sign(data, process.env.JWT_SECRET, jwtConfig);