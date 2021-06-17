exports.getApi = (req, res) => {
  res.status(200).send({
    api: {
      "api directory": "GET /api",
      "list categories": "GET /api/categories",
      "list reviews": "GET /api/reviews?{sort_by, order, category}",
      "find review by review_id": "GET /api/reviews/:review_id",
      "update review by review_id": "PATCH /api/reviews/:review_id",
      "list comments by review_id": "GET /api/reviews/:review_id/comments",
      "create comment by review_id": "POST /api/reviews/:review_id/comments",
    },
  });
};
