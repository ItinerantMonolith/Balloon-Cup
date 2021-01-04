'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
        Game.belongsTo(models.User, {
            foreignKey: 'player1_id',
            as: 'player1'
        })
        Game.belongsTo(models.User, {
            foreignKey: 'player2_id',
            as: 'player2'
        })
        Game.hasMany(models.GameTurn, {
            foreignKey: 'game_id',
            as: 'gameTurns'
        })
    }
  };
  Game.init({
    player0Id: {
        field: 'player1_id',
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    } ,
    player1Id: {
        field: 'player2_id',
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    } ,
    status: DataTypes.STRING,
    winner: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'games'
  });
  return Game;
};