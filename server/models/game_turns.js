'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
   class GameTurn extends Model {
      static associate(models) {
         GameTurn.belongsTo(models.Game, {
            foreignKey: 'game_id',
            as: 'gameTurns',
         })
      }
   }
   GameTurn.init(
      {
         gameId: {
            field: 'game_id',
            type: DataTypes.UUID,
            references: {
               model: 'games',
               key: 'id',
            },
            allowNull: false,
         },
         turn: DataTypes.INTEGER,
         player: DataTypes.INTEGER,
         playerAction: {
            field: 'player_action',
            type: DataTypes.JSONB,
         },
         gameAction: {
            field: 'game_action',
            type: DataTypes.JSONB,
         },
         gameState: {
            field: 'game_state',
            type: DataTypes.JSONB,
         },
      },
      {
         sequelize,
         modelName: 'GameTurn',
         tableName: 'game_turns',
      }
   )
   return GameTurn
}
