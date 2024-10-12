const express = require("express");
const contactController = require("../controllers/contact");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/", contactController.create);

router.get("all", authMiddleware, isAdminMiddleware, contactController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, contactController.delete)
  .put(authMiddleware, isAdminMiddleware, contactController.update);

router.post(
  "/answer",
  authMiddleware,
  isAdminMiddleware,
  contactController.answer
);

module.exports = router;
