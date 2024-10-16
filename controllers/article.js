const { isValidObjectId } = require("mongoose");
const ArticleModel = require("../models/article");
const CategoryModel = require("../models/article");
const AricleValidator = require("../validators/article");
const ITEM_PER_PAGE = require("../utils/constant");
exports.create = async (req, res, next) => {
  try {
    const { title, category, body, tags, href, description } = req.body;

    const isArticleValid = AricleValidator(req.body);

    if (isArticleValid !== true) {
      return res.status(422).json(isArticleValid);
    }

    if (!req.file.filename) {
      return res.status(429).json({ message: "Please upload image :(" });
    }

    const article = await ArticleModel.create({
      author: req.user._id,
      body,
      category,
      cover: req.file.filename,
      description,
      href,
      publish: 1,
      tags,
      title,
    });

    return res
      .status(201)
      .json({ message: "Article created successfully :)", article });
  } catch (error) {
    next();
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { href } = req.params;

    const article = await ArticleModel.findOne({ href })
      .populate("category author", "name username title href")
      .lean();
    return res.json(article);
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    if (!isValidObjectId(articleId)) {
      return res.status(422).json({ message: "Please send valid article id" });
    }

    const article = await ArticleModel.findOneAndDelete({ _id: articleId });

    if (!article) {
      return res.status(404).json({ message: "Article is not found :(" });
    }

    return res.json({ message: "Article deleted successfully :(" });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    if (!isValidObjectId(articleId)) {
      return res.status(422).json({ message: "Please send valid article id" });
    }

    const { title, category, body, tags, href, description } = req.body;

    if (!req.file.filename) {
      return res.status(429).json({ message: "Please upload image :(" });
    }

    const mainArticle = await ArticleModel.findOne({ _id: articleId });

    const article = await ArticleModel.findOneAndUpdate(
      { _id: articleId },
      {
        body,
        category,
        cover: req?.file?.filename ?? mainArticle.cover,
        description,
        href,
        tags,
        title,
      }
    );

    return res
      .status(201)
      .json({ message: "Article created successfully :)", article });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({})
      .populate("category author", "name username title href")
      .sort({ _id: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const articleCount = await ArticleModel.countDocuments({});

    return res.json({ articles, count: articleCount });
  } catch (error) {
    next();
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({})
      .populate("category author", "name username title href")
      .sort({ _id: -1 });

    return res.json(articles);
  } catch (error) {
    next();
  }
};

exports.getArticlesByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const mainCategory = await CategoryModel.findOne({ _id: categoryId });

    const mainArticles = await ArticleModel.find({
      category: mainCategory._id,
    })
      .populate("category author", "name username title href")
      .sort({ _id: -1 });

    return res.json(mainArticles);
  } catch (error) {
    next();
  }
};

exports.saveDraftArticle = async (req, res, next) => {
  try {
    try {
      const { title, category, body, tags, href, description } = req.body;

      const isArticleValid = AricleValidator(req.body);

      if (isArticleValid !== true) {
        return res.status(422).json(isArticleValid);
      }

      if (!req.file.filename) {
        return res.status(429).json({ message: "Please upload image :(" });
      }

      const article = await ArticleModel.create({
        author: req.user._id,
        body,
        category,
        cover: req.file.filename,
        description,
        href,
        publish: 0,
        tags,
        title,
      });

      return res
        .status(201)
        .json({ message: "Article created successfully :)", article });
    } catch (error) {
      next();
    }
  } catch (error) {
    next();
  }
};
