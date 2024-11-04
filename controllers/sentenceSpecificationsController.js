const {
  TestSpecification,
  UserSentenceSpecification,
  Text,
  Token,
} = require("../models");
const { updateUserStats } = require("../controllers/userController.js");
const { sequelize } = require("../service/db.js");
const textController = require("./textController.js");

const getText = async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber < 30) {
      return await getTextTestNegation(req, res);
    } else {
      const gameType = "negation";
      const nbToken = 100;
      req.params = { gameType, nbToken };
      const smallText = await textController.getSmallTextWithTokens(req, res);
      return smallText;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTextTestNegation = async (req, res) => {
  try {
    // trouver un texte qui a le champ is_negation_specification à true
    const text = await Text.findOne({
      where: {
        is_negation_specification_test: true,
        is_active: true,
      },
      attributes: [
        "id",
        // "num",
        // "origin",
        // "is_negation_specification_test",
        // "length",
      ],
      order: sequelize.literal("RAND()"),
      include: [
        {
          model: Token,
          attributes: ["id", "content", "position", "is_punctuation"],
        },
      ],
    });
    if (!text) {
      return res.status(404).json({ error: "No more texts to process" });
    }
    text.tokens.sort((a, b) => a.position - b.position);
    text.dataValues.sentence_positions = "1, 2, 3, 4";

    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendResponse = async (req, res) => {
  const { textId, userSentenceSpecifications, userId, responseNum } = req.body;
  const transaction = await sequelize.transaction();
  try {
    let pointsToAdd = 0,
      percentageToAdd = 0,
      trustIndexIncrement = 0;
    let success = false;
    let message = null;
    let additionalPoints = 0;
    let checkResult = null;

    const text = await Text.findOne({ where: { id: textId } });
    if (!text) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Text not found" });
    }

    await text.increment("nb_of_treatments", { by: 1, transaction });

    if (text.is_negation_specification_test) {
      checkResult = await checkUserSelection(
        textId,
        userSentenceSpecifications,
        "negation"
      );

      if (!checkResult.isValid) {
        const correctSpecification = checkResult.testSpecifications
          .map((spec) => `• ${spec.content}`)
          .join("\n");
        const allPositions = checkResult.testSpecifications.flatMap((spec) =>
          spec.word_positions.split(",").map((pos) => parseInt(pos))
        );

        message =
          checkResult.testSpecifications.length > 0
            ? `Oups, raté! Voilà les négations qu'il fallait trouver :\n${correctSpecification}`
            : "Oh non, il n'y avait rien à trouver ici";
        if (responseNum < 6) {
          console.log("********** Suspicion de spam ************ ");
          console.log("user", userId);
          pointsToAdd = 5;
          percentageToAdd = 0;
          trustIndexIncrement = -5;
        } else {
          pointsToAdd = 0;
          percentageToAdd = 0;
          trustIndexIncrement = -1;
        }
      } else {
        additionalPoints = checkResult.testSpecifications.length;
        pointsToAdd = 5 + additionalPoints;
        percentageToAdd = 3;
        trustIndexIncrement = 2;
        success = true;
      }
    } else {
      additionalPoints = userSentenceSpecifications.length;
      pointsToAdd = 5 + additionalPoints;
      percentageToAdd = 3;
      trustIndexIncrement = 0;
      success = true;

      for (let spec of userSentenceSpecifications) {
        const { id, ...specData } = spec;
        await createUserSentenceSpecification(
          {
            ...specData,
          },
          transaction
        );
      }
    }

    const updatedStats = await updateUserStats(
      userId,
      pointsToAdd,
      percentageToAdd,
      trustIndexIncrement,
      transaction
    );

    await transaction.commit();

    const response = {
      success: success,
      newPoints: updatedStats.newPoints,
      newCatchProbability: updatedStats.newCatchProbability,
      newTrustIndex: updatedStats.newTrustIndex,
      newCoeffMulti: updatedStats.newCoeffMulti,
      newAchievements: updatedStats.newAchievements,
      showSkinModal: updatedStats.showSkinModal,
      skinData: updatedStats.skinData,
      message: message,
      correctPositions: checkResult
        ? checkResult.testSpecifications.map((spec) =>
            spec.word_positions.split(",").map((pos) => parseInt(pos))
          )
        : [],
    };

    res.status(200).json(response);
  } catch (error) {
    await transaction.rollback();
    console.error("Error processing response:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllSentenceSpecifications = async (req, res) => {
  try {
    const userSentenceSpecifications =
      await UserSentenceSpecification.findAll();
    res.status(200).json(userSentenceSpecifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserSentenceSpecification = async (data, transaction) => {
  try {
    const newUserSentenceSpecification = await UserSentenceSpecification.create(
      data,
      { transaction }
    );
    return newUserSentenceSpecification;
  } catch (error) {
    console.error("Error in createUserSentenceSpecification:", error);
    throw error;
  }
};

const checkUserSelection = async (
  textId,
  userSentenceSpecifications,
  gameType,
  positionErrorMargin = 3,
  negationErrorMargin = 0
) => {
  try {
    const testSpecifications = await TestSpecification.findAll({
      where: {
        text_id: textId,
        type: gameType,
      },
    });

    if (
      testSpecifications.length === 0 &&
      userSentenceSpecifications.length > 0
    ) {
      return { isValid: false, testSpecifications };
    }

    if (
      testSpecifications.length === 1 &&
      userSentenceSpecifications.length >
        testSpecifications.length + negationErrorMargin
    ) {
      return { isValid: false, testSpecifications };
    } else if (
      testSpecifications.length > 1 &&
      Math.abs(userSentenceSpecifications.length - testSpecifications.length) >
        negationErrorMargin
    ) {
      return { isValid: false, testSpecifications };
    }

    let matchedNegationsCount = 0;
    const notFoundSpecifications = [];

    testSpecifications.forEach((testSpec) => {
      const testWordPositions = testSpec.word_positions
        .split(",")
        .map((pos) => parseInt(pos));

      const isMatched = userSentenceSpecifications.some((userSpec) => {
        const userWordPositions = userSpec.word_positions
          .split(",")
          .map((pos) => parseInt(pos));
        return testWordPositions.some((testPos) =>
          userWordPositions.some(
            (userPos) => Math.abs(userPos - testPos) <= positionErrorMargin
          )
        );
      });

      if (isMatched) {
        matchedNegationsCount++;
      } else {
        notFoundSpecifications.push(testSpec);
      }
    });

    if (matchedNegationsCount < testSpecifications.length) {
      return { isValid: false, testSpecifications: notFoundSpecifications };
    }

    return { isValid: true, testSpecifications: notFoundSpecifications };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Une erreur est survenue lors de la vérification de votre sélection."
    );
  }
};

module.exports = {
  createUserSentenceSpecification,
  checkUserSelection,
  getAllSentenceSpecifications,
  sendResponse,
  getText,
  getTextTestNegation,
};