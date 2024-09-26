const express = require("express");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const categoryController = require("../controllers/Category");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryController.create)
  .get(categoryController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, categoryController.delete)
  .put(authMiddleware, isAdminMiddleware, categoryController.update);

module.exports = router;
