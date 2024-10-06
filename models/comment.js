import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    isAccept: {
      type: Number,
      default: 0,
    },
    isAnswer: {
      type: Number,
      default: 0,
    },
    mainCommentId: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Comment", schema);

module.exports = model;
