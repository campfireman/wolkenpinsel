import BrowserStorage from "@/components/BrowserStorage";
import StyleRule from "@/components/StyleRule";

const STYLE_RULE_ID = "d8326284-1e56-46ca-8d4b-a3ee116263d6";

beforeAll(() => {
  jest
    .spyOn(StyleRule.prototype, "createId")
    .mockImplementation(() => STYLE_RULE_ID);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("migrate010", () => {
  test("Old format is replaced correctly", async () => {
    // given
    const exampleConfig = {
      gcpColorSettings: {
        "test-project01": { navbarColor: "red" },
      },
    };
    const result = {
      formatVersion: "1.0.0",
      gcpStyleRules: [
        {
          id: STYLE_RULE_ID,
          pattern: "test-project01",
          styles: [{ name: "gcpNavbarColor", value: "red" }],
        },
      ],
    };
    let mockStorage;
    const getFromStorage = jest.fn((key) =>
      Promise.resolve({ [key]: exampleConfig[key] })
    );
    const setInStorage = jest.fn((dict) => {
      mockStorage = dict;
    });
    const removeFromStorage = jest.fn();

    const classUnderTest = new BrowserStorage({
      set: setInStorage,
      get: getFromStorage,
      remove: removeFromStorage,
    });

    // when
    await classUnderTest.migrate010();

    // then
    expect(getFromStorage).toBeCalledWith("gcpColorSettings");
    expect(setInStorage).toBeCalledWith({
      [classUnderTest.STORAGE_EXTENSION_KEY]: result,
    });
    expect(removeFromStorage).toBeCalledWith("gcpColorSettings");
  });
});
