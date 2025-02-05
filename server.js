require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require('./database/db');
const mainRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.set('pool', pool);

app.use(mainRoutes);

module.exports = app;