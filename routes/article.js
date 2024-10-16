const express = require("express");
const { multerStorage } = require("../middlewares/multer");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const articleController = require("../controllers/article");
const { multerStorage } = require("../middlewares/multer");

const router = express.Router();

const multer = multerStorage("public/uploads");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, articleController.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer.single("cover"),
    articleController.create
  );

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, articleController.delete)
  .put(
    authMiddleware,
    isAdminMiddleware,
    multer.single("cover"),
    articleController.update
  );

router.route("/:href").get(articleController.getOne);

router.route("/all").get(articleController.getAllArticles);

router.route("/categoryId").get(articleController.getArticlesByCategory);

router.route(
  "/draft",
  authMiddleware,
  isAdminMiddleware,
  articleController.saveDraftArticle
);

module.exports = router;
