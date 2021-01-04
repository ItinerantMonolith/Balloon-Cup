'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('games', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
         },
         player0Id: {
            field: 'player0_id',
            type: Sequelize.UUID,
            references: {
               model: 'users',
               key: 'id',
            },
            allowNull: false
         },
         player1Id: {
            field: 'player1_id',
            type: Sequelize.UUID,
            references: {
               model: 'users',
               key: 'id',
            },
            allowNull: false
         },
         status: {
            type: Sequelize.STRING,
            allowNull: false
         },
         winner: {
            type: Sequelize.INTEGER,
            allowNull: false
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
      })
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('games')
   },
}
