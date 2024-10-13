const { isValidObjectId } = require("mongoose");
const NewsLetterModel = require("../models/newsLetter");
const { emailReg } = require("../utils/regex");
const ITEM_PER_PAGE = require("../utils/constant");
exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!emailReg.test(email)) {
      return res.status(422).json({ message: "Please send valid email" });
    }

    const newsLetter = await NewsLetterModel.create({
      email,
    });

    return res
      .status(201)
      .json({ message: "Email send successfully :)", newsLetter });
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const newsLetter = await NewsLetterModel.findOneAndDelete({ _id: id });

    if (!newsLetter) {
      return res.status(404).json({ message: "news letter not found :(" });
    }

    return res.json({ message: "newsletter deleted successfully:)" });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const newsLetters = await NewsLetterModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const newsLetterCount = await NewsLetterModel.countDocuments({});

    return res.json({ newsLetters, count: newsLetterCount });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    if (!emailReg.test(email)) {
      return res.status(422).json({ message: "Please send valid email" });
    }

    const updatedNewsLetter = await NewsLetterModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          email,
        },
      }
    );

    return res.json({
      message: "newsletter updated successfully :)",
      updatedNewsLetter,
    });
  } catch (error) {
    next();
  }
};
