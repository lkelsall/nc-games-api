exports.formatCategories = (catData) => {
  return catData.map((object) => {
    return [object.slug, object.description];
  });
};
