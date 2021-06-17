exports.getApi = (req, res) => {
  res.status(200).send({
    api: {
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
            description: "increments the vote count of the requested review",
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
            req_body: "should include a valid username and comment body text",
          },
        },
      },
    },
  });
};
