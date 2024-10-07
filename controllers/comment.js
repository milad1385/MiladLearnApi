const { isValidObjectId } = require("mongoose");
const CommentModel = require("../models/comment");
const CourseModel = require("../models/course");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { courseId, body, score } = req.body;
    if (!courseId || !body) {
      return res.status(422).json({ message: "Please fill all of the filed" });
    }

    const comment = await CommentModel.create({
      course: courseId,
      user: req.user._id,
      body,
      score,
    });

    return res
      .status(201)
      .json({ message: "Comment created successfully:)", comment });
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id " });
    }

    const comment = await CommentModel.findOneAndDelete({ _id: id });

    if (!comment) {
      return res.status(404).json({ message: "Comment is not found" });
    }

    return res.json({ message: "Comment deleted successfully :)" });
  } catch (error) {
    next();
  }
};

exports.acceptOrReject = async (req, res, next) => {
  try {
    const { id, status } = req.params;

    if (!isValidObjectId(id) || !status) {
      return res
        .status(422)
        .json({ message: "Please send valid id and status " });
    }

    const comment = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: status === "accept" ? 1 : 0,
        },
      }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment is not found" });
    }

    return res.json({
      message: `Comment ${
        status === "accept" ? "accept" : "reject"
      } successfully :)`,
    });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;
    const comments = await CommentModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const commentCount = await CommentModel.countDocuments();

    return res.json({ comments, count: commentCount });
  } catch (error) {
    next();
  }
};

exports.answer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { body } = req.body;

    if (!isValidObjectId(id) || !body) {
      return res.status(422).json({ message: "Please send valid object id" });
    }

    const mainComment = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: 1,
        },
      }
    );

    const comment = await CommentModel.create({
      course: mainComment.course,
      user: req.user._id,
      body,
      isAnswer: 1,
      isAccept: 1,
      mainCommentId: mainComment._id,
    });

    return res
      .status(201)
      .json({ message: "answer sended successfully :)", comment });
  } catch (error) {
    next();
  }
};
