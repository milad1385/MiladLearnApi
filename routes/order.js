const express = require("express");
const authMiddleware = require("../middlewares/auth");

const orderController = require("../controllers/order");

const router = express.Router();

router.route("/").get(authMiddleware, orderController.getAllOrders);

router.route("/:id").get(authMiddleware, orderController.getOrder);

module.exports = router;
