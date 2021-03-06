exports.getApi = (req, res) => {
  res.status(200).send({
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/categories": {
      description: "serves an array of all categories",
      queries: [],
      exampleResponse: {
        categories: [
          {
            description: "Players attempt to uncover each other's hidden role",
            slug: "Social deduction",
          },
        ],
      },
    },
    "GET /api/reviews": {
      description: "serves an array of all reviews",
      queries: ["category", "sort_by", "order"],
      exampleResponse: {
        reviews: [
          {
            category: "hidden-roles",
            owner: "happyamy2016",
            title: "One Night Ultimate Werewolf",
            review_id: 4,
            review_img_url:
              "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            review_preview: "We couldn't find the werewolf!",
            comment_count: "4",
          },
        ],
      },
    },
    "GET /api/reivews/:review_id": {
      description: "serves the review with the requested review_id",
      queries: [],
      exampleResponse: {
        review: {
          review_id: 1,
          title: "Culture a Love of Agriculture With Agricola",
          review_body:
            "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 3,
          category: "strategy",
          owner: "tickle122",
          created_at: "2021-01-18T10:00:20.514Z",
          comment_count: "4",
        },
      },
    },
    "PATCH /api/reviews/:review_id": {
      description:
        "increments the vote count of review with the requested review_id",
      queries: [],
      exampleRequestBody: {
        inc_votes: 1,
      },
      exampleResponse: {
        review: {
          review_id: 1,
          title: "Culture a Love of Agriculture With Agricola",
          review_body:
            "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 5,
          category: "strategy",
          owner: "tickle122",
          created_at: "2021-01-18T10:00:20.514Z",
        },
      },
    },
    "GET /api/reviews/:review_id/comments": {
      description:
        "serves an array of all the comments for the requested review",
      queries: [],
      exampleResponse: {
        comments: [
          {
            comment_id: 59,
            votes: 3,
            created_at: "2021-03-27T19:48:58.110Z",
            author: "jessjelly",
            body: "Quis duis mollit ad enim deserunt.",
          },
        ],
      },
    },
    "POST /api/reviews/:review_id/comments": {
      description: "create a new comment for the requested review",
      queries: [],
      exampleRequestBody: {
        username: "cooljmessy",
        body: "another new comment",
      },
      exampleResponse: {
        comment: {
          comment_id: 75,
          author: "cooljmessy",
          review_id: 1,
          votes: 0,
          created_at: "2021-08-10T15:31:37.412Z",
          body: "another new comment",
        },
      },
    },
    "PATCH /api/comments/:comment_id": {
      description:
        "increments the vote count of comment with the requested comment_id",
      queries: [],
      exampleRequestBody: {
        inc_votes: 1,
      },
      exampleResponse: {
        comment: {
          comment_id: 75,
          author: "cooljmessy",
          review_id: 1,
          votes: 3,
          created_at: "2021-08-10T15:31:37.412Z",
          body: "another new comment",
        },
      },
    },
    "DELETE /api/comments/:comment_id": {
      description: "delete the comment with the requested comment_id",
      queries: [],
    },
  });
};
