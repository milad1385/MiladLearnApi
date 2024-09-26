const express = require("express");
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const router = express.Router();

router.use(authMiddleware, isAdminMiddleware);

router.route("/").get(userController.getAll);

router.route("/:id").delete(userController.delete).put(userController.update);

router.route("/:id/ban").post(userController.addUserToBanList);

module.exports = router;
