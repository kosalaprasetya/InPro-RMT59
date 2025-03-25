const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const signToken = (payload) => {
  const accessToken = jwt.sign(payload, secretKey);
  return accessToken;
};

const verifyToken = (token) => {
  const verified = jwt.verify(token, secretKey);
  return verified;
};

module.exports = { signToken, verifyToken };
