const { getText } = require("./plausibilityController");
const { mockRandom, resetMockRandom } = require("jest-mock-random");
const { Text } = require("../models");

jest.mock("../models");

const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
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
      req = mockRequest();
      res = mockResponse();
      await getText(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: expectedErrorCode }));
    }
  );

  it("should return 200 with text data if test text is available", async () => {
    mockRandom(0.0);
    req = mockRequest();
    res = mockResponse();

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
