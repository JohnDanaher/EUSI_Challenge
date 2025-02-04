require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require('./database/db');
const mainRoutes = require('./routes');

const app = express();
const port = process.env.SERVER_PORT

app.use(cors());
app.use(express.json());

app.set('pool', pool);

app.use(mainRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });