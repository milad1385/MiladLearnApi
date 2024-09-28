const express = require("express");
const { multerStorage } = require("../middlewares/multer");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const courseController = require("../controllers/course");

const router = express.Router();

const multer = multerStorage("public/uploads");

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, courseController.create);

module.exports = router;
