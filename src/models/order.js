'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.Customer, {foreignKey: 'customer_id', targetKey:'id', as: 'order_customer'})
      // Order.belongsTo(models.Driver, {foreignKey: 'driver_id', targetKey:'id', as:'order_driver'})
    }
  }
  Order.init({
    sender_name: DataTypes.STRING,
    sender_phone: DataTypes.STRING,
    sender_address: DataTypes.STRING,
    sender_detail_address: DataTypes.TEXT,
    receiver_name: DataTypes.STRING,
    receiver_phone: DataTypes.STRING,
    receiver_address: DataTypes.STRING,
    receiver_detail_address: DataTypes.TEXT,
    size_item: DataTypes.BOOLEAN,
    detail_item: DataTypes.TEXT,
    infor_shipping: DataTypes.BOOLEAN,
    distance: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    socket_id: DataTypes.STRING,
    confirm_order_at: DataTypes.DATE,
    delete_order_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};