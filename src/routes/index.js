'use strict';

const express = require('express');
const router = express.Router();
const apiKey = require("../auth/checkAuth");

router.use(apiKey);

// router.use("/v1/api/", require("./shop"))

router.use("/v1/api/", require("./access"))

module.exports = router;