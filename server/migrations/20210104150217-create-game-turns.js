'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('game_turns', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
         },
      gameId: {
          field: 'game_id',
        type: Sequelize.UUID,
        references: {
            model: 'games',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
      },
      turn: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      player: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      playerAction: {
          field: 'player_action',
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      gameAction: {
          field: 'game_action',
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      gameState: {
          field: 'game_state',
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
     },
     updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
     },
});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('game_turns');
  }
};