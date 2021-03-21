"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "dinner room",
          imageUrl:
            "https://i.pinimg.com/564x/98/ea/8a/98ea8a50b8dfceeefa986f512b07702e.jpg",
          description: "all your furniture here",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bedroom",
          imageUrl:
            "https://i.pinimg.com/564x/d3/d1/64/d3d164347e9884387c108f966eed99eb.jpg",
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
