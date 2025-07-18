const { getText } = require("../../src/controllers/plausibilityController");
const { mockRandom, resetMockRandom } = require("jest-mock-random");
const { Text, Sentence, Token } = require("../../src/models");
const { sequelize } = require("../../src/service/db");
const { getUserById } = require("../../src/controllers/userController");

jest.mock("../../src/controllers/userController");

const mockRequest = (query, sessionData) => {
  return {
    session: { data: sessionData },
    query: query ?? {},
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const createText = async (params) => {
  const { text_id, is_active, is_plausibility_test } = params ?? {
    text_id: 1,
    is_active: true,
    is_plausibility_test: false,
  };
  await Text.create({
    id: text_id,
    num: "test1",
    content: "Bienvenue à bord.",
    origin: "réel - faux",
    is_active: is_active,
    is_plausibility_test: is_plausibility_test,
  });
  const sentence = await Sentence.create({
    text_id: text_id,
    content: "Bienvenue à bord.",
    position: 1,
  });
  await Token.create({
    text_id: text_id,
    sentence_id: sentence.id,
    content: "Bienvenue ",
    is_punctuation: false,
    position: 1,
  });
  await Token.create({
    text_id: text_id,
    sentence_id: sentence.id,
    content: "à ",
    is_punctuation: false,
    position: 2,
  });
  await Token.create({
    text_id: text_id,
    sentence_id: sentence.id,
    content: "bord",
    is_punctuation: false,
    position: 3,
  });
  await Token.create({
    text_id: text_id,
    sentence_id: sentence.id,
    content: ".",
    is_punctuation: true,
    position: 4,
  });
};

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  resetMockRandom();
  await Text.destroy({ where: {} }); // destroy all texts, truncate doesn't work due to foreign keys constraints
});

describe("getText", () => {
  it.each`
    textType    | randomValue | expectedErrorCode
    ${"test"}   | ${0.0}      | ${"no-test-texts"}
    ${"group"}  | ${0.3}      | ${"no-group-texts"}
    ${"unseen"} | ${0.99}     | ${"no-texts"}
  `(
    "should return 404 if there is no $textType texts available",
    async ({ randomValue, expectedErrorCode }) => {
      mockRandom(randomValue); // force going into the proper probability branch, but not great that the test "knows" how it works inside...
      const req = mockRequest({ user: 1 });
      const res = mockResponse();
      getUserById.mockReturnValue({ id: 1 });
      await getText(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: expectedErrorCode }));
    }
  );

  it("should return 200 with text data if test text is available", async () => {
    mockRandom(0.0);
    const req = mockRequest({ user: 1 });
    const res = mockResponse();
    getUserById.mockReturnValue({ id: 1 });

    const text_id = 1;
    await createText({ text_id, is_active: true, is_plausibility_test: true });

    await getText(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: text_id }));
  });

  it("should return 404 if test text is available but not active", async () => {
    mockRandom(0.0);
    const req = mockRequest({ user: 1 });
    const res = mockResponse();
    getUserById.mockReturnValue({ id: 1 });

    const text_id = 1;
    await createText({ text_id, is_active: false, is_plausibility_test: true });

    await getText(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: "no-test-texts" }));
  });

  it("should return 400 if no user was provided in req query params", async () => {
    const req = mockRequest();
    const res = mockResponse();
    getUserById.mockReturnValue(undefined);
    await getText(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: "no-user-with-id" }));
  });

  it.skip("should return 200 with text data if group text rating is available", async () => {
    /*GroupTextRatingMock.$queryInterface.$useHandler((query, queryOptions) => {
      if (query === 'findOne') {
        return GroupTextRatingMock.build({ id: queryOptions[0].where.id });
      }
    });*/
  });
});
