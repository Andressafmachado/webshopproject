"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "items",
      [
        {
          orderId: 1,
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          orderId: 2,
          productId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("items", null, {});
  },
};
