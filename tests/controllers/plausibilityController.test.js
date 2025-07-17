const { getText } = require("../../src/controllers/plausibilityController");
const { mockRandom, resetMockRandom } = require("jest-mock-random");
const { Text, GroupTextRating } = require("../../src/models");
const { getUserById } = require("../../src/controllers/userController");

jest.mock("../../src/models");
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

    const expected = {
      id: 1,
      dataValues: {}, // required to avoid undefined
      tokens: [], // required to avoid undefined
    };
    Text.findOne.mockReturnValue(expected);

    await getText(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
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

  afterEach(() => {
    resetMockRandom();
  });
});
