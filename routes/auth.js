const express = require("express");
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", auth, authController.me);

module.exports = router;
