const express = require("express");
const searchController = require("../controllers/search");

const router = express.Router();

router.get("/", searchController.getSearch);

module.exports = router;
