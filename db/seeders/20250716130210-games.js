"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          id: 1,
          name: "MythoNo",
        },
        {
          id: 2,
          name: "MythoOuPas",
        },
        {
          id: 3,
          name: "MythoTypo",
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("games", null, {});
  },
};
