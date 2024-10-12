const express = require("express");
const notificationController = require("../controllers/notification");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router.use(authMiddleware, isAdminMiddleware);

router
  .route("/")
  .get(notificationController.getAll)
  .post(notificationController.create);

router
  .route("/:id")
  .delete(notificationController.delete)
  .put(notificationController.update);

router.route("/admins").get(notificationController.getAdminNotifications);

module.exports = router;
