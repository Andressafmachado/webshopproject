"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "dinner room",
          imageUrl: "linkhere",
          description: "all your furniture here",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bedroom",
          imageUrl: "linkhere",
          description: "all your furniture here",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
