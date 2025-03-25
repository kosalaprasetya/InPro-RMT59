const { User } = require('../models');
const { comparePassword, hasher } = require('../helpers/bcrypt');
const { signToken, verifyToken } = require('../helpers/jwt');

class UsersController {
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      const user = await User.create({ fullName, email, password });
      const returnObj = {
        id: +user.id,
        fullName: user.fullName,
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

  static async getAllUser(req, res, next) {
    try {
      const allUsers = await User.findAll();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw { name: 'not found', message: 'User not found' };
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, email, password } = req.body;

      if (!email && !password) throw { name: 'bad request', message: 'Email and password is required' };
      const user = await User.findByPk(id);
      if (!user) throw { name: 'not found', message: 'User not found' };

      const hashedPassword = hasher(password);
      const result = await User.update({ fullName, email, password: hashedPassword }, { where: { id } });
      res.status(201).json({ message: 'User updated' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { authorization: userToken } = req.headers;
      if (!userToken) throw { name: 'unauthorized', message: 'Token is required' };

      const currentUser = verifyToken(userToken.split(' ')[1]);
      if (+currentUser.id === +id) throw { name: 'forbidden', message: 'You are not allowed to delete yourself' };

      const user = await User.findByPk(id);
      if (!user) throw { name: 'not found', message: 'User not found' };

      await User.destroy({ where: { id } });

      res.status(200).json({ message: 'User deleted successfully', id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
