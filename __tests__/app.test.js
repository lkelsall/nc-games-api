const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

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
    // replace string comment_count values returned by pg with num values
    const reviews = commentSortRes.body.reviews.map((review) => {
      return { ...review, comment_count: Number(review.comment_count) };
    });
    expect(reviews).toBeSortedBy("comment_count", {
      descending: true,
    });
  });

  it("400 -- responds with an error if the sort_by query value is not a valid column name", () => {
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
});
