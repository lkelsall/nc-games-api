exports.formatCategories = (catData) => {
  return catData.map((catObject) => {
    return [catObject.slug, catObject.description];
  });
};

exports.formatUsers = (userData) => {
  return userData.map((userObj) => {
    return [userObj.username, userObj.name, userObj.avatar_url];
  });
};

exports.formatReviews = (reviewData) => {
  return reviewData.map((reviewObj) => {
    const url =
      reviewObj.review_img_url ||
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg";

    return [
      reviewObj.title,
      reviewObj.review_body,
      reviewObj.designer,
      url,
      reviewObj.votes,
      reviewObj.category,
      reviewObj.owner,
      reviewObj.created_at,
    ];
  });
};

exports.createReviewRef = (reviews) => {
  const newRefObj = {};
  reviews.forEach((review) => {
    newRefObj[review.title] = review.review_id;
  });
  return newRefObj;
};

exports.ammendComments = (commentData, lookup) => {
  return commentData.map((comment) => {
    return [
      comment.body,
      comment.created_by,
      comment.votes,
      comment.created_at,
      lookup[comment.belongs_to],
    ];
  });
};
