require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const mainRoutes = require('./routes');

const app = express();
const port = process.env.SERVER_PORT

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.set('pool', pool);

app.use(mainRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });