const { isValidObjectId } = require("mongoose");
const CategoryModel = require("../models/category");

exports.create = async (req, res, next) => {
  try {
    const { title, href } = req.body;

    if (!title || !href) {
      return res.status(422).json({
        message: "Please fill all of the field",
      });
    }

    const category = await CategoryModel.create({
      href,
      title,
    });

    return res.status(201).json({
      message: "Category created successfully :)",
      category,
    });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({});
    return res.json(categories);
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({
        message: "Please send valid Id",
      });
    }

    const category = await CategoryModel.findOneAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({
        message: "Category is not found !!!",
      });
    }

    return res.json({
      message: "Category Deleted successfully :)",
    });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, href } = req.body;

    if (!title || !href) {
      return res.status(422).json({
        message: "Please fill all of the field",
      });
    }

    if (!isValidObjectId(id)) {
      return res.status(422).json({
        message: "Please send valid Id",
      });
    }

    const category = await CategoryModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          href,
          title,
        },
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category is not found !!!",
      });
    }

    return res.json({
      message: "Category Updated successfully :)",
    });
  } catch (error) {
    next();
  }
};
