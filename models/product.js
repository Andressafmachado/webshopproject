"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.category, { foreignKey: "categoryId" });
      product.belongsToMany(models.order, {
        through: "item",
        foreignKey: "productId",
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
