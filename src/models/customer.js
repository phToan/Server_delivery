'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    point: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};