"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "variables",
      [
        {
          id: 1,
          key: "base_points_earned_mythooupas",
          value: 14,
          default_value: 14,
          description:
            "Base de points gagnés dans MythoOuPas. Avoir trouvé la bonne plausibilité et les bonnes erreurs font gagner 2 points en plus.",
        },
        {
          id: 2,
          key: "base_points_earned_mythono",
          value: 5,
          default_value: 5,
          description: "Base de points gagnés dans MythoNo.",
        },
        {
          id: 3,
          key: "base_points_earned_mythotypo",
          value: 3,
          default_value: 3,
          description: "Base de points gagnés dans MythoTypo.",
        },
        {
          id: 7,
          key: "base_catchability_mythooupas",
          value: 5,
          default_value: 5,
          description: "Points de probabilité d'arrestation gagnés dans MythoOuPas.",
        },
        {
          id: 8,
          key: "base_catchability_mythono",
          value: 3,
          default_value: 3,
          description: "Points de probabilité d'arrestation gagnés dans MythoNo.",
        },
        {
          id: 9,
          key: "base_catchability_mythotypo",
          value: 3,
          default_value: 3,
          description: "Points de probabilité d'arrestation gagnés dans MythoTypo.",
        },
        {
          id: 10,
          key: "text_length_in_game",
          value: 110,
          default_value: 110,
          description:
            "Limitation en nombre de tokens de la longueur de textes affichés dans les jeux. ATTENTION : changer cette longueur fera qu'on ne pourra plus comparer les réponses des joueurs avec celles déjà données avant la modification, car les ensembles de phrases composant les réponses n'auront pour la plupart plus la même longueur.",
        },
        {
          id: 14,
          key: "percentage_test_mythooupas",
          value: 25,
          default_value: 25,
          description: "Pourcentage de chance de tomber sur un texte de contrôle dans MythoOuPas.",
        },
        {
          id: 15,
          key: "percentage_test_mythono",
          value: 30,
          default_value: 30,
          description: "Pourcentage de chance de tomber sur un texte de contrôle dans MythoNo.",
        },
        {
          id: 16,
          key: "percentage_test_mythotypo",
          value: 30,
          default_value: 30,
          description: "Pourcentage de chance de tomber sur un texte de contrôle dans MythoTypo.",
        },
        {
          id: 21,
          key: "text_already_treated_mythooupas",
          value: 20,
          default_value: 20,
          description:
            "Pourcentage de chance de tomber sur un texte déjà traité par au moins un autre joueur dans MythoOuPas.",
        },
        {
          id: 22,
          key: "text_already_treated_mythono",
          value: 20,
          default_value: 20,
          description:
            "Pourcentage de chance de tomber sur un texte déjà traité par au moins un autre joueur dans MythoNo.",
        },
        {
          id: 23,
          key: "text_already_treated_mythotypo",
          value: 20,
          default_value: 20,
          description:
            "Pourcentage de chance de tomber sur un texte déjà traité par au moins un autre joueur dans MythoTypo.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("variables", null, {});
  },
};
