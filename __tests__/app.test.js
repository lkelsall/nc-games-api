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
