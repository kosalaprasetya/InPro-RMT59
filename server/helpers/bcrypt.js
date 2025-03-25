const bcrypt = require('bcryptjs');

const hasher = (text) => {
  const salt = bcrypt.genSaltSync(1);
  const hashed = bcrypt.hashSync(text, salt);
  return hashed;
};

const comparePassword = (password, hash) => {
  const isValid = bcrypt.compareSync(password, hash);
  return isValid;
};

module.exports = { hasher, comparePassword };
