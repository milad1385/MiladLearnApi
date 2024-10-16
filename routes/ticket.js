const express = require("express");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const ticketController = require("../controllers/Ticket");
const router = express.Router();

router
  .route("/")
  .post(ticketController.create)
  .get(authMiddleware, isAdminMiddleware, ticketController.getAllTickets);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, ticketController.delete);

router.route("/answer").post(authMiddleware, ticketController.answer);

router.route("/user").get(authMiddleware, ticketController.getUserTickets);

router.route("/:id/answer").get(authMiddleware, ticketController.getAnswer);

module.exports = router;
