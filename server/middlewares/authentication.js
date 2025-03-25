const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: 'unauthorized', message: 'Invalid Token' };

    const authToken = authorization.split(' ');
    if (authToken[0] !== 'Bearer' || !authToken[1]) throw { name: 'unauthorized', message: 'Invalid Token' };

    const tokenValue = verifyToken(authToken[1]);
    const userData = await User.findByPk(tokenValue.id);
    if (!userData) throw { name: 'unauthorized', message: 'Invalid Token' };

    req.user = {
      id: userData.id,
      role: userData.role,
    };

    next();
  } catch (error) {
    console.log('throwing error from authentication >>>>>');

    next(error);
  }
};

module.exports = authentication;
