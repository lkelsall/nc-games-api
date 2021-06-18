const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const { get } = require("../routers/categories.router");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("invalid URL", () => {
  it("404 -- if an invalid endpoint is requested, responds with an error", () => {
    return request(app)
      .get("/api/invalid_endpoint")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/categories", () => {
  it("200 -- responds with an array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories.length).toBe(4);
        body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  it("200 -- responds with the requested review object", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          title: "Jenga",
          review_id: 2,
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 5,
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          comment_count: "3",
        });
      });
  });

  it("400 -- if the requested review_id is not valid, responds with an error", () => {
    return request(app)
      .get("/api/reviews/jenga")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("404 -- if the requested review_id doesn't exist, responds with an error", () => {
    return request(app)
      .get("/api/reviews/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  it("200 -- responds with the updated review", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: 2 })
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(7);
      });
  });

  it("400 -- if the requested review_id is not valid, responds with an error", () => {
    return request(app)
      .patch("/api/reviews/jenga")
      .send({ inc_votes: 5 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("404 -- if the requested review_id doesn't exist, responds with an error", () => {
    return request(app)
      .patch("/api/reviews/99")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  it("400 -- if there is no inc_votes property on the request body, responds with an error", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("400 -- if the inc_votes property on the request body is of the wrong type, responds with an error", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: "three" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/reviews", () => {
  it("200 -- responds with an array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });

  it("200 -- by default, responds with reviews sorted by date created in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", { descending: true });
      });
  });

  it("200 -- responds with reviews sorted by the property provided via query, in descending order by default", async () => {
    const idSortRes = await request(app).get("/api/reviews?sort_by=review_id");
    expect(idSortRes.body.reviews).toBeSortedBy("review_id", {
      descending: true,
    });
    const commentSortRes = await request(app).get(
      "/api/reviews?sort_by=comment_count"
    );

    expect(commentSortRes.body.reviews).toBeSortedBy("comment_count", {
      descending: true,
      coerce: true,
    });
  });

  it("404 -- responds with an error if the sort_by query value is not a valid column name", () => {
    return request(app)
      .get("/api/reviews?sort_by=not_a_column")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("200 -- responds with review sorted in the order provided via query", async () => {
    const ascRes = await request(app).get("/api/reviews?order=asc");
    expect(ascRes.body.reviews).toBeSortedBy("created_at", { ascending: true });
  });

  it("400 -- responds with an error if the order query has a value other than 'asc' or 'desc'", () => {
    return request(app)
      .get("/api/reviews?order=none")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("200 -- responds with reviews filtered by the category value provided via query", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200)
      .then(({ body }) => {
        body.reviews.forEach((review) =>
          expect(review.category).toBe("dexterity")
        );
      });
  });

  it("200 -- responds with an empty array when category query value is valid but no reviews are found", () => {
    return request(app)
      .get("/api/reviews?category=children's%20games")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual([]);
      });
  });

  it("404 -- responds with an error if the category query value is not a valid category", () => {
    return request(app)
      .get("/api/reviews?category=invalid_category")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  it("200 -- responds with an array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(3);
        body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });

  it("404 -- responds with an error if there is no review with the requested review_id", () => {
    return request(app)
      .get("/api/reviews/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  it("400 -responds with an error if the review_id requested is of an invalid type", () => {
    return request(app)
      .get("/api/reviews/bug/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  it("200 -- should respond with the newly created comment", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "mallionaire", body: "jenga!" })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            comment_id: 7,
            author: "mallionaire",
            review_id: 2,
            votes: 0,
            created_at: expect.any(String),
            body: "jenga!",
          })
        );
      });
  });

  it("404 -- should respond with an error when the given username does not exist", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "unknown_user", body: "jenga" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  it("400 -- should respond with an error when the given username is of the wrong type", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: 12345, body: "jenga" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("404 -- should respond with an error when the requested review_id does not exist", () => {
    return request(app)
      .post("/api/reviews/99/comments")
      .send({ username: "mallionaire", body: "jenga" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  it("400 -- should respond with an error when the requested review_id id of the wrong type", () => {
    return request(app)
      .post("/api/reviews/a_string/comments")
      .send({ username: "mallionaire", body: "jenga" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("400 -- should respond with an error if the given body is not of the correct type", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "mallionaire", body: 12345 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("400 -- should respond with an error if the request body does not have a body property", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "mallionaire" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  it("400 -- should respond with an error if the request body does not have a username property", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ body: "jenga!" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET /api", () => {
  it("200 -- returns an object describing available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.api).toEqual({
          "/api": {
            methods: { GET: { description: "responds with API directory" } },
          },

          "/api/categories": {
            methods: {
              GET: {
                description: "responds with an array of game categories",
              },
            },
          },

          "/api/reviews": {
            methods: {
              GET: {
                description: "responds with an array of game reviews",
              },
              queries: {
                sort_by: [
                  "owner",
                  "title",
                  "review_id",
                  "category",
                  "created_at",
                  "votes",
                  "comment_count",
                ],
                order: ["ASC", "DESC"],
                category: "any valid game category",
              },
            },
          },

          "/api/reviews/:review_id": {
            methods: {
              GET: {
                description: "responds with the requested review object",
              },
              PATCH: {
                description:
                  "increments the vote count of the requested review",
                req_body: "should include an inc_votes key with a number value",
              },
            },
          },

          "/api/reviews/review_id/comments": {
            methods: {
              GET: {
                description:
                  "responds with an array of comments for the requested review",
              },
              POST: {
                description: "creates a new comment for the requested review",
                req_body:
                  "should include a valid username and comment body text",
              },
            },
          },
        });
      });
  });
});
