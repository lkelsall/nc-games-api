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
    return [
      reviewObj.title,
      reviewObj.review_body,
      reviewObj.designer,
      reviewObj.review_img_url,
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
