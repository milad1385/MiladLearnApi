const express = require("express");
const CommentController = require("../controllers/comment");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, CommentController.create)
  .get(authMiddleware, isAdminMiddleware, CommentController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, CommentController.delete)
  .post(authMiddleware, isAdminMiddleware, CommentController.answer);

router
  .route("/:id/:status")
  .put(authMiddleware, isAdminMiddleware, CommentController.acceptOrReject);

module.exports = router;
