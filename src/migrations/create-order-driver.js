'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_drivers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver_id: {type: Sequelize.INTEGER, allowNull: false},
      id_Order: {
        type: Sequelize.INTEGER
      },
      status: {type: Sequelize.BOOLEAN},
      takeAt: {
        type: Sequelize.DATE
      },
      confirmAt: {
        type: Sequelize.DATE
      },
      deleteAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_drivers');
  }
};