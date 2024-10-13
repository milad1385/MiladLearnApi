const express = require("express");

const newsLetterController = require("../controllers/newLetter");

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(newsLetterController.create)
  .get(authMiddleware, isAdminMiddleware, newsLetterController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, newsLetterController.delete)
  .put(authMiddleware, isAdminMiddleware, newsLetterController.update);

module.exports = router;
