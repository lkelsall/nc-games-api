const db = require("../connection");
const format = require("pg-format");
const { formatCategories } = require("../utils/data-manipulation");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);

  await db.query(`CREATE TABLE categories (
    slug VARCHAR(200) NOT NULL PRIMARY KEY,
    description VARCHAR(500)
  );`);

  await db.query(`CREATE TABLE users (
    username VARCHAR(200) NOT NULL PRIMARY KEY,
    avatar_url VARCHAR(500),
    name VARCHAR(200) 
  );`);

  await db.query(`CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    review_body VARCHAR(500),
    designer VARCHAR(200),
    review_img_url VARCHAR(500) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(200) REFERENCES categories(slug),
    owner VARCHAR(200) REFERENCES users(username),
    created_at DATE DEFAULT current_date);`);

  await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(200) REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes INT DEFAULT 0,
      created_at DATE DEFAULT current_date,
      body VARCHAR(500)
    );`);

  const insertData = await db.query(
    format(
      `INSERT INTO categories (
    slug, description)
    VALUES %L RETURNING *;
  `,
      formatCategories(categoryData)
    )
  );
  console.log(insertData.rows);
};

module.exports = seed;
