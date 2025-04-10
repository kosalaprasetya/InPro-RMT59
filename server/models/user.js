'use strict';
const { Model } = require('sequelize');
const { hasher } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Full name cannot be null' },
          notEmpty: { msg: 'Full name cannot be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Email tidak boleh null
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
        validate: {
          notNull: { msg: 'Email cannot be null' },
          notEmpty: { msg: 'Email cannot be empty' },
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Password tidak boleh null
        validate: {
          notNull: { msg: 'Password cannot be null' },
          notEmpty: { msg: 'Password cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(user, options) {
          user.password = hasher(user.password);
        },
      },
    }
  );
  return User;
};
