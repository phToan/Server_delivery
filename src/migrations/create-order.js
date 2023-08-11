'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sender_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sender_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sender_detail_address: {
        type: Sequelize.TEXT
      },
      receiver_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiver_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiver_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiver_detail_address: {
        type: Sequelize.TEXT
      },
      size_item: {
        type: Sequelize.BOOLEAN
      },
      detail_item: {
        type: Sequelize.TEXT
      },
      infor_shipping: {
        type: Sequelize.BOOLEAN
      },
      distance: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      driver_id: {
        type: Sequelize.INTEGER
      },      
      confirm_order_at: {
        type: Sequelize.DATE
      },
      delete_order_at: {
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
    await queryInterface.dropTable('Orders');
  }
};