const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },

    publish: {
      type: Number,
      default: 0,
    },
    href: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Article", schema);

module.exports = model;
