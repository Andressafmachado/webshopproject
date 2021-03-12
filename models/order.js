"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsTo(models.user);
      order.belongsToMany(models.product, {
        through: "item",
        foreignKey: "orderId",
      });
    }
  }
  order.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
