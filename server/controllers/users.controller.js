const { User } = require('../models');
const { comparePassword, hasher } = require('../helpers/bcrypt');
const { signToken, verifyToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UsersController {
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        throw { name: 'bad request', message: 'Full name, email, and password are required' }; // Add validation
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw { name: 'bad request', message: 'Invalid email format' }; // Validate email format
      }

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

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: '199258532213-eulv0rk3khjv8c7jjbta0nch24h72pjm.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();

      const time = new Date();
      const randomNumber = Math.floor(Math.random() * 19 + 1);
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          fullName: payload.name,
          email: payload.email,
          password: `${+time}${randomNumber}`,
        },
      });
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
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

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw { name: 'bad request', message: 'Invalid email format' }; // Validate email format
      }

      if (!id) throw { name: 'bad request', message: 'User ID is required' }; // Add validation
      if (!email && !fullName) throw { name: 'bad request', message: 'Full name or email is required' };

      const user = await User.findByPk(id);
      if (!user) throw { name: 'not found', message: 'User not found' };

      const updateData = { fullName, email };
      if (password) updateData.password = hasher(password); // Only hash password if provided

      await User.update(updateData, { where: { id } });
      res.status(201).json({ message: 'User updated' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { authorization: userToken } = req.headers;

      if (!id) throw { name: 'bad request', message: 'User ID is required' }; // Add validation
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
