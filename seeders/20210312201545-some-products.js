"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "table",
          description: "white",
          price: 200,
          imageUrl: "linkhere",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bed",
          description: "white",
          price: 200,
          imageUrl: "linkhere",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
