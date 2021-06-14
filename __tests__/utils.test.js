const {
  formatCategories,
  formatUsers,
  formatReviews,
  createReviewRef,
  ammendComments,
} = require("../db/utils/data-manipulation");

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

describe("formatUsers", () => {
  it("when passed an empty array, returns an empty array", () => {
    expect(formatUsers([])).toEqual([]);
  });
  it("returns a new array", () => {
    const input = [];
    expect(formatUsers(input)).not.toBe(input);
  });
  it("when passed an array of one user object, returns an array containing one nested user array", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    expect(formatUsers(input)).toEqual([
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
    ]);
  });

  it("when passed an array of multiple user objects, return an array of multiple nested user arrays", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "dav3rid",
        name: "dave",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];

    const expected = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "dav3rid",
        "dave",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ];

    expect(formatUsers(input)).toEqual(expected);
  });
  it("formatUsers should not mutate the input array", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    formatUsers(input);
    expect(input).toEqual([
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ]);
  });
});

describe("formatReviews", () => {
  it("when passed an empty array, returns an empty array", () => {
    expect(formatReviews([])).toEqual([]);
  });
  it("should return a new array", () => {
    const input = [];
    expect(formatReviews(input)).not.toBe(input);
  });
  it("when passed an array of one review object, returns an array of one nested review array", () => {
    expect(
      formatReviews([
        {
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: new Date(1610964020514),
          votes: 1,
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ])
    ).toEqual([
      [
        "Agricola",
        "Farmyard fun!",
        "Uwe Rosenberg",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        1,
        "euro game",
        "mallionaire",
        new Date(1610964020514),
      ],
    ]);
  });

  it("when passed an array of multiple review objects, return an array of multiple nested review arrays", () => {
    expect(
      formatReviews([
        {
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: new Date(1610964020514),
          votes: 1,
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
        {
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: new Date(1610964101251),
          votes: 5,
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ])
    ).toEqual([
      [
        "Agricola",
        "Farmyard fun!",
        "Uwe Rosenberg",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        1,
        "euro game",
        "mallionaire",
        new Date(1610964020514),
      ],
      [
        "Jenga",
        "Fiddly fun for all the family",
        "Leslie Scott",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        5,
        "dexterity",
        "philippaclaire9",
        new Date(1610964101251),
      ],
    ]);
  });
  it("formatReviews should not mutate the input array", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];
    formatReviews(input);
    expect(input).toEqual([
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ]);
  });
});

describe("createReviewRef", () => {
  it("when passed an empty array, returns an empty object", () => {
    expect(createReviewRef([])).toEqual({});
  });
  it("when passed an array of one review object, returns an object with a title-review_id key-value pair", () => {
    expect(
      createReviewRef([
        {
          review_id: 21,
          title: "Ganz Schon Clever",
          review_body: `The title translates to "that's so clever" and it won't take you long to realise why. Ganz Schon Clever is a really engagind roll-and-write where you'll try to collect score points from coloured dice. Sounds simple, but the real strategy of this game lies in how you collect the bonuses.`,
          designer: "Wolfgang Warsch",
          review_img_url:
            "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 8,
          category: "roll-and-write",
          owner: "happyamy2016",
          created_at: "2020-09-12T23:00:00.000Z",
        },
      ])
    ).toEqual({ "Ganz Schon Clever": 21 });
  });

  it("when passed an array of multiple review objects, returns an object with multiple title-review_id key-value pairs", () => {
    expect(
      createReviewRef([
        {
          review_id: 21,
          title: "Ganz Schon Clever",
          review_body: `The title translates to "that's so clever" and it won't take you long to realise why. Ganz Schon Clever is a really engagind roll-and-write where you'll try to collect score points from coloured dice. Sounds simple, but the real strategy of this game lies in how you collect the bonuses.`,
          designer: "Wolfgang Warsch",
          review_img_url:
            "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 8,
          category: "roll-and-write",
          owner: "happyamy2016",
          created_at: "2020-09-12T23:00:00.000Z",
        },
        {
          review_id: 20,
          title: "Monopoly",
          review_body:
            "This household classic needs no introduction. Monopoly has been causeing family fallouts for close to 90 years. With numerous special editions and no doubt more still to come almost everyone has played this game, but has anyone ever finished it?",
          designer: "Uncredited",
          review_img_url:
            "https://images.pexels.com/photos/1314435/pexels-photo-1314435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 3,
          category: "strategy",
          owner: "grumpy19",
          created_at: "2020-09-12T23:00:00.000Z",
        },
      ])
    ).toEqual({ "Ganz Schon Clever": 21, Monopoly: 20 });
  });

  it("does not mutate the input array", () => {
    const input = [
      {
        review_id: 21,
        title: "Ganz Schon Clever",
        review_body: `The title translates to "that's so clever" and it won't take you long to realise why. Ganz Schon Clever is a really engagind roll-and-write where you'll try to collect score points from coloured dice. Sounds simple, but the real strategy of this game lies in how you collect the bonuses.`,
        designer: "Wolfgang Warsch",
        review_img_url:
          "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        votes: 8,
        category: "roll-and-write",
        owner: "happyamy2016",
        created_at: "2020-09-12T23:00:00.000Z",
      },
    ];
    createReviewRef(input);
    expect(input).toEqual([
      {
        review_id: 21,
        title: "Ganz Schon Clever",
        review_body: `The title translates to "that's so clever" and it won't take you long to realise why. Ganz Schon Clever is a really engagind roll-and-write where you'll try to collect score points from coloured dice. Sounds simple, but the real strategy of this game lies in how you collect the bonuses.`,
        designer: "Wolfgang Warsch",
        review_img_url:
          "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        votes: 8,
        category: "roll-and-write",
        owner: "happyamy2016",
        created_at: "2020-09-12T23:00:00.000Z",
      },
    ]);
  });
});

describe.only("ammendComments", () => {
  it("returns an array", () => {
    expect(Array.isArray(ammendComments([]))).toBe(true);
  });
  it("returns a new array", () => {
    const input = [];
    expect(ammendComments(input)).not.toBe(input);
  });
  it("when passed an array of one comment object, returns a single nested comment array containing the review_id", () => {
    const testLookup = { "One Night Ultimate Werewolf": 4 };
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "One Night Ultimate Werewolf",
        created_by: "tickle122",
        votes: 3,
        created_at: new Date(1610964545410),
      },
    ];
    const expected = [
      [
        "My dog loved this game too!",
        "tickle122",
        3,
        new Date(1610964545410),
        4,
      ],
    ];
    expect(ammendComments(input, testLookup)).toEqual(expected);
  });

  it("when passed an array of multiple comment objects, returns an array of multiple nested comment arrays, ech with a review_id", () => {
    const testLookup = { "One Night Ultimate Werewolf": 4, Monopoly: 20 };
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "One Night Ultimate Werewolf",
        created_by: "tickle122",
        votes: 3,
        created_at: new Date(1610964545410),
      },
      {
        body: "Now this is a story all about how, board games turned my life upside down",
        belongs_to: "Monopoly",
        created_by: "cooljmessy",
        votes: 13,
        created_at: new Date(1610965445410),
      },
    ];
    const expected = [
      [
        "My dog loved this game too!",
        "tickle122",
        3,
        new Date(1610964545410),
        4,
      ],
      [
        "Now this is a story all about how, board games turned my life upside down",
        "cooljmessy",
        13,
        new Date(1610965445410),
        20,
      ],
    ];

    expect(ammendComments(input, testLookup)).toEqual(expected);
  });
  test("the input array should not be mutated", () => {
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "One Night Ultimate Werewolf",
        created_by: "tickle122",
        votes: 3,
        created_at: new Date(1610964545410),
      },
    ];
    const testLookup = { "One Night Ultimate Werewolf": 4 };
    ammendComments(input, testLookup);
    expect(input).toEqual([
      {
        body: "My dog loved this game too!",
        belongs_to: "One Night Ultimate Werewolf",
        created_by: "tickle122",
        votes: 3,
        created_at: new Date(1610964545410),
      },
    ]);
  });
});
