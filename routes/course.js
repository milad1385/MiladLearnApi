const express = require("express");
const { multerStorage } = require("../middlewares/multer");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const courseController = require("../controllers/course");

const router = express.Router();

const multer = multerStorage("public/uploads");

router
  .route("/")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer.single("cover"),
    courseController.create
  )
  .get(courseController.getAllCourses);

router
  .route("/:id/session")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer.single("video"),
    courseController.createSession
  );

router
  .route("/sessions")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);

router
  .route("/session/:sessionId")
  .get(authMiddleware, courseController.getSessionInfo);

router
  .route("/session/:id")
  .delete(authMiddleware, isAdminMiddleware, courseController.deleteSession);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, courseController.deleteCourse)
  .put(authMiddleware, isAdminMiddleware, courseController.updateCourse)
  .get(authMiddleware, courseController.getOne);

router.route("/category/:href", courseController.getCourseByCategory);
module.exports = router;
