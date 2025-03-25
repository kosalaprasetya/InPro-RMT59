const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UsersController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      const returnObj = {
        id: +user.id,
        email: user.email,
      };
      res.status(201).json(returnObj);
    } catch (error) {
      console.log(error, '<<<<<<<<<<< REGISTER');
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: 'bad request', message: 'Email is required' };
      if (!password) throw { name: 'bad request', message: 'Password is required' };

      const user = await User.findOne({ where: { email: email } });
      if (!user) throw { name: 'unauthorized', message: 'Invalid email/password' };

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        throw { name: 'unauthorized', message: 'Invalid email/password' };
      } else {
        const token = signToken({ id: user.id });
        res.status(200).json({ access_token: token });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
