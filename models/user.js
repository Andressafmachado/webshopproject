"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.order);
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
