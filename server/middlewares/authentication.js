const { verifyToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: 'unauthorized', message: 'Token is required' };

    const token = authorization.split(' ')[1];
    const payload = verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
