const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    free: {
      type: Number, // 0 => not free | 1 => free
      enum: [0, 1],
      default: 0,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    video: {
      type: String,
      required: true,
      default: "test.mp4",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Session", schema);

module.exports = model;
