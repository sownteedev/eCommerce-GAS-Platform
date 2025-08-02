require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); // logger
const helmet = require("helmet"); // security
const compression = require("compression"); // compression to reduce the size of the response
const instanceMongoDb = require("./dbs/mongoo.db");
const app = express();

// init middleware
app.use(morgan("dev")); // logger
app.use(helmet()); // security
app.use(compression()); // compression

// init db
require("./dbs/mongoo.db");

// init routes
app.use('/', require('./routes'));

// handle errors

module.exports = app;