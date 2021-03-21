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
          imageUrl:
            "https://i.pinimg.com/564x/38/ea/c9/38eac94cd0e4e8c4ab8c0d14e51fc1ca.jpg",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bed",
          description: "white",
          price: 200,
          imageUrl:
            "https://i.pinimg.com/564x/84/98/91/849891188ab43af6ab66f5183a5580a4.jpg",
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
