'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_driver.belongsTo(models.Order ,{foreignKey: 'id_Order', targetKey: 'id', as: 'orderData'})
    }
  }
  Order_driver.init({
    driver_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    id_Order: DataTypes.INTEGER,
    takeAt: DataTypes.DATE,
    confirmAt: DataTypes.DATE,
    deleteAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order_driver',
  });
  return Order_driver;
};