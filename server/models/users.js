'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany( models.Game, {
            foreignKey: 'player0_id',
            as: 'player0'
        })
        User.hasMany( models.Game, {
            foreignKey: 'player1_id',
            as: 'player1'
        })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};