const express = require("express");
const discountController = require("../controllers/discount");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, discountController.create)
  .get(authMiddleware, isAdminMiddleware, discountController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, discountController.delete)
  .put(authMiddleware, isAdminMiddleware, discountController.update);

router.get("/getInfo", authMiddleware, discountController.getInfo);

router.put(
  "/set-discount",
  authMiddleware,
  discountController.setDiscountToAllCourses
);

module.exports = router;
