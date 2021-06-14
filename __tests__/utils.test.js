const { formatCategories } = require("../db/utils/data-manipulation");

describe("formatCategories", () => {
  it("Returns empty array when passed empty array", () => {
    expect(formatCategories([])).toEqual([]);
  });
  it("Returns new array", () => {
    const array = [];
    expect(formatCategories(array)).not.toBe(array);
  });
  it("When passed array of one cat obj, returns new array of single nested array", () => {
    const input = [
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
    ];
    const expected = [
      [
        "strategy",
        "Strategy-focused board games that prioritise limited-randomness",
      ],
    ];
    expect(formatCategories(input)).toEqual(expected);
  });
  it("When passed array of multiple cat. objects, returns new array of multiple nested arrays", () => {
    const input = [
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
      {
        slug: "hidden-roles",
        description: "test description",
      },
    ];
    const expected = [
      [
        "strategy",
        "Strategy-focused board games that prioritise limited-randomness",
      ],
      ["hidden-roles", "test description"],
    ];
    expect(formatCategories(input)).toEqual(expected);
  });
  it("Does not mutate original input", () => {
    const input = [
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
    ];
    formatCategories(input);
    expect(input).toEqual([
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
    ]);
  });
});
