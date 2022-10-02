import RandomGenerator from "@/components/RandomGenerator";

describe("getRandomprojectName", () => {
  test("Returns proper String structure", () => {
    expect(RandomGenerator.getRandomProjectName()).toEqual(
      expect.stringMatching("[0-9a-zA-Z]+-[0-9a-zA-Z]+")
    );
  });
});
