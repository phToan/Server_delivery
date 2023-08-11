'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Driver.init({
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    vehicle_num: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};