# Board-Game-Reviews API

### Description

An API for storage and access to board game reviews, as well as linked review comments.

Hosted version --> https://board-game-reviews.herokuapp.com/api/

### Local Setup

- Clone this repo and run "npm install" to install dependencies.
- Set up local databases (instructions below)
- In order to run the suite of tests provided, run "npm test".
- To start the express server listening (on localhost:9090 by default) run "node listen.js".

#### Database Setup

- Run setup.sql to create local PSQL databases for testing and development.
- Create ".env.development" and ".env.test" files, used by connection.js to set the value of PGDATABASE.
- Run npm run seed in order to seed the development database.

### Requirements

- Node.js v16.0 or higher
- PostgreSQL v13.0 or higher
