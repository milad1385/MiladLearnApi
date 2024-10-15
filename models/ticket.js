const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: { type: String, required: true, trim: true },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    periority: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Boolean,
      default: false,
    },
    parrent: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Ticket",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Ticket", schema);

module.exports = model;
