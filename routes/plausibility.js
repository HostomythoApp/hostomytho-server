var express = require("express");
var router = express.Router();
const {
  Text,
  UserErrorDetail,
  Sentence,
  Token,
  GroupTextRating,
} = require("../models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const {
  updateUserStats,
  getUserById,
} = require("../controllers/userController");
const {
  createUserTextRating,
  createUserErrorDetail,
} = require("../controllers/errorController");

const checkUserSelectionPlausibility = async (
  textId,
  userErrorDetails,
  userRateSelected,
  plausibilityMargin = 25,
  tokenErrorMargin = 1
) => {
  try {
    const textDetails = await getTextDetailsById(textId);
    if (!textDetails) throw new Error("Text details not found");

    const testPlausibilityError = await getTestPlausibilityErrorByTextId(
      textId
    );

    const textPlausibility = parseFloat(textDetails.test_plausibility);
    const isPlausibilityCorrect =
      Math.abs(userRateSelected - textPlausibility) <= plausibilityMargin;

    let isValid = isPlausibilityCorrect;
    let reasonForRate = textDetails.reason_for_rate || "";

    const isErrorDetailsCorrect =
      testPlausibilityError.length > 0
        ? areUserErrorsCorrect(
            userErrorDetails,
            testPlausibilityError,
            tokenErrorMargin
          )
        : true;

    return {
      isValid: isValid && isErrorDetailsCorrect,
      testPlausibilityError: isErrorDetailsCorrect ? [] : testPlausibilityError,
      correctPlausibility: textPlausibility,
      testPlausibilityPassed: isPlausibilityCorrect,
      isErrorDetailsCorrect,
      reasonForRate,
    };
  } catch (error) {
    console.error("Error in checkUserSelectionPlausibility:", error);
    return {
      isValid: false,
      testPlausibilityError: [],
    };
  }
};

const areUserErrorsCorrect = (
  userErrorDetails,
  testPlausibilityError,
  tokenErrorMargin
) => {
  const allTestErrorPositions = testPlausibilityError.flatMap((spec) =>
    spec.word_positions.split(",").map((pos) => parseInt(pos))
  );

  return userErrorDetails.some((errorDetail) => {
    const userWordPositions = errorDetail.word_positions
      .split(",")
      .map((pos) => parseInt(pos));
    return userWordPositions.some((userPos) =>
      allTestErrorPositions.some(
        (testPos) => Math.abs(testPos - userPos) <= tokenErrorMargin
      )
    );
  });
};

// TODO Verif du token user
router.post("/sendResponse", async (req, res) => {
  const {
    textId,
    userErrorDetails,
    userRateSelected,
    sentencePositions,
    userId,
  } = req.body;
  try {
    let pointsToAdd = 0,
      percentageToAdd = 0,
      trustIndexIncrement = 0;
    let success = false;
    let message = null;
    let checkResult = null;

    const textDetails = await getTextDetailsById(textId);

    if (!textDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Text not found" });
    }

    if (textDetails.is_plausibility_test) {
      checkResult = await checkUserSelectionPlausibility(
        textId,
        userErrorDetails,
        userRateSelected
      );

      const noErrorSpecified = userErrorDetails.length === 0;
      const noErrorInDatabase = checkResult.testPlausibilityError.length === 0;

      if (noErrorSpecified || noErrorInDatabase) {
        if (checkResult.testPlausibilityPassed) {
          pointsToAdd = 10;
          percentageToAdd = 1;
          trustIndexIncrement = 1;
          success = true;
        } else {
          pointsToAdd = 0;
          percentageToAdd = 0;
          trustIndexIncrement = -1;
          success = false;
          message = checkResult.reasonForRate;
        }
      } else {
        const correctSpecification = checkResult.testPlausibilityError
          .map((spec) => `• ${spec.content}`)
          .join("\n");
        const allPositions = checkResult.testPlausibilityError.flatMap((spec) =>
          spec.word_positions.split(",").map((pos) => parseInt(pos))
        );

        if (
          !checkResult.isErrorDetailsCorrect &&
          checkResult.testPlausibilityPassed
        ) {
          pointsToAdd = 10;
          percentageToAdd = 1;
          trustIndexIncrement = 1;
          success = false;
          message = `Vous avez bien estimé la plausibilité, mais voilà les erreurs qu'il fallait trouver :\n${correctSpecification}`;
        } else if (
          !checkResult.isErrorDetailsCorrect &&
          !checkResult.testPlausibilityPassed
        ) {
          pointsToAdd = 0;
          percentageToAdd = 0;
          trustIndexIncrement = -1;
          success = false;
          message = `${checkResult.reasonForRate}\nLes erreurs à trouver étaient :\n${correctSpecification}`;
        } else if (
          checkResult.isErrorDetailsCorrect &&
          !checkResult.testPlausibilityPassed
        ) {
          pointsToAdd = 10 + userErrorDetails.length;
          percentageToAdd = 1;
          trustIndexIncrement = 1;
          success = false;
          message =
            "Vous avez bien identifié les zones de doute, mais la plausibilité estimée était incorrecte.";
        } else if (
          checkResult.isErrorDetailsCorrect &&
          checkResult.testPlausibilityPassed
        ) {
          pointsToAdd = 14 + userErrorDetails.length;
          percentageToAdd = 1;
          trustIndexIncrement = 2;
          success = true;
        }
      }
    } else {
      // non-test scenario
      const user = await getUserById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const vote_weight =
        user.status === "medecin" ? user.trust_index + 30 : user.trust_index;

      additionalPoints = userErrorDetails.length;
      pointsToAdd = 10 + additionalPoints;
      percentageToAdd = 1;
      trustIndexIncrement = 0;
      success = true;

      const userTextRating = {
        user_id: userId,
        text_id: textId,
        plausibility: userRateSelected,
        vote_weight: vote_weight,
        sentence_positions: sentencePositions,
      };
      await createUserTextRating(userTextRating);

      for (let errorDetail of userErrorDetails) {
        await createUserErrorDetail({
          ...errorDetail,
          user_id: userId,
          text_id: textId,
          vote_weight: vote_weight,
        });
      }
    }

    const updatedStats = await updateUserStats(
      userId,
      pointsToAdd,
      percentageToAdd,
      trustIndexIncrement
    );

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
        ? checkResult.testPlausibilityError.map((spec) =>
            spec.word_positions.split(",").map((pos) => parseInt(pos))
          )
        : [],
      correctPlausibility:
        checkResult && !checkResult.testPlausibilityPassed
          ? checkResult.correctPlausibility
          : null,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in sendPlausibilityResponse:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/getErrorDetailTest/:textId", async function (req, res, next) {
  const textId = req.params.textId;

  try {
    const plausibilityErrors = await UserErrorDetail.findAll({
      where: {
        text_id: textId,
        is_test: true,
        test_error_type_id: {
          [Op.ne]: 10, // Enlever les erreurs qui sont typées "non erreur"
        },
      },
    });
    res.status(200).json(plausibilityErrors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getSmallText", async function (req, res, next) {
  try {
    const choice = Math.random() < 0.5; // 50% de chance d'avoir un texte déjà joué
    const nbToken = 110;

    let text, group;

    if (choice) {
      // Choix d'un texte déjà joué tiré de GroupTextRating
      group = await GroupTextRating.findOne({
        order: Sequelize.literal("RAND()"),
        include: {
          model: Text,
          attributes: ["id"],
        },
      });

      if (group && group.text) {
        text = group.text;
        let sentences = await Sentence.findAll({
          where: { text_id: text.id },
          attributes: ["id", "position"],
          order: [["position", "ASC"]],
          include: [{
            model: Token,
            attributes: ["id", "content", "position", "is_punctuation"],
            required: true,
          }]
        });
      
        let tokens = sentences.flatMap(sentence => sentence.tokens.map(token => ({
          id: token.id,
          content: token.content,
          position: token.position,
          is_punctuation: token.is_punctuation,
        })));
      
        let result = {
          id: text.id,
          sentence_positions: sentences.map(sentence => sentence.position).join(", "),
          tokens: tokens
        };
      
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "No suitable group text found" });
      }
    }

    if (!text) {
      text = await Text.findOne({
        attributes: ["id"],
        order: Sequelize.literal("RAND()"),
      });

      if (!text) {
        return res.status(404).json({ error: "No more texts to process" });
      }

      // Récupérer les phrases du texte sélectionné, triées par leur position
      let sentences = await Sentence.findAll({
        where: { text_id: text.id },
        attributes: ["id", "position"],
        order: [["position", "ASC"]],
        include: [
          {
            model: Token,
            attributes: ["id", "content", "position", "is_punctuation"],
            required: true,
          },
        ],
      });

      if (sentences.length === 0) {
        return res
          .status(404)
          .json({ error: "Text " + text.id + " has no sentences" });
      }

      // Calculer le nombre total de tokens pour chaque phrase
      let totalTokensBySentence = sentences.map(
        (sentence) => sentence.tokens.length
      );
      // Calculer le total cumulatif de tokens pour identifier les points de départ possibles
      let cumulativeTokens = totalTokensBySentence.reduce((acc, curr, i) => {
        acc.push((acc[i - 1] || 0) + curr);
        return acc;
      }, []);

      let selectedSentences = [];
      let totalTokens = 0;

      if (cumulativeTokens[cumulativeTokens.length - 1] < nbToken) {
        selectedSentences = [...sentences]; // Utiliser toutes les sentences
        totalTokens = cumulativeTokens[cumulativeTokens.length - 1]; // Total de tokens du texte
      } else {
        // Déterminer le maxStartIndex correctement sans utiliser startIndex dans le calcul
        let validStartIndexes = cumulativeTokens.findIndex(
          (cumulative) => cumulative >= nbToken
        );
        if (validStartIndexes === -1) {
          // Si aucun index valide n'est trouvé
          return res
            .status(404)
            .json({ error: "Cannot find a suitable start position" });
        }

        // Le maxStartIndex est maintenant l'index du dernier élément qui peut servir de point de départ valide
        let maxStartIndex =
          validStartIndexes < sentences.length
            ? validStartIndexes
            : sentences.length - 1;

        let startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
        let startFromEnd = Math.random() < 0.5; // 50% chance de commencer par la fin

        if (startFromEnd) {
          // Sélectionner depuis la fin
          for (
            let i = sentences.length - 1;
            i >= 0 && totalTokens < nbToken;
            i--
          ) {
            selectedSentences.unshift(sentences[i]); // Ajouter au début pour conserver l'ordre
            totalTokens += sentences[i].tokens.length;
            if (totalTokens >= nbToken) break;
          }
        } else {
          // Sélectionner depuis le début (votre logique actuelle)
          for (let i = 0; i < sentences.length && totalTokens < nbToken; i++) {
            selectedSentences.push(sentences[i]);
            totalTokens += sentences[i].tokens.length;
            if (totalTokens >= nbToken) break;
          }
        }
      }

      let groupedTokens = selectedSentences.flatMap((sentence) =>
        sentence.tokens.map((token) => ({
          id: token.id,
          content: token.content,
          position: token.position,
          is_punctuation: token.is_punctuation,
        }))
      );

      // Construire le résultat final
      let result = {
        id: text.id,
        sentence_positions:
          selectedSentences.length === sentences.length
            ? "full"
            : selectedSentences.map((sentence) => sentence.position).join(", "),
        tokens: groupedTokens,
      };

      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getTestPlausibilityErrorByTextId = async (textId) => {
  try {
    const testPlausibilityErrors = await UserErrorDetail.findAll({
      where: {
        text_id: textId,
        is_test: true,
      },
      attributes: ["id", "text_id", "word_positions", "content"], // spécifiez ici les attributs que vous souhaitez récupérer
    });
    return testPlausibilityErrors.map((error) => {
      return {
        id: error.id,
        text_id: error.text_id,
        word_positions: error.word_positions,
        content: error.content,
      };
    });
  } catch (error) {
    console.error(
      "Error fetching test plausibility errors from UserErrorDetail:",
      error
    );
    throw new Error(
      "Error fetching test plausibility errors from UserErrorDetail"
    );
  }
};

const getTextDetailsById = async (textId) => {
  try {
    const textDetails = await Text.findOne({
      where: { id: textId },
      attributes: [
        "test_plausibility",
        "reason_for_rate",
        "is_plausibility_test",
      ],
    });
    return textDetails;
  } catch (error) {
    console.error("Error fetching text details:", error);
    throw new Error("Error fetching text details");
  }
};

module.exports = router;
