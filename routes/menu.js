const express = require("express");
const menuController = require("../controllers/menu");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, menuController.create)
  .get(authMiddleware, isAdminMiddleware, menuController.getAllMenus);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, menuController.delete)
  .put(authMiddleware, isAdminMiddleware, menuController.update);

router.route("/all").get(menuController.getAll);

module.exports = router;
