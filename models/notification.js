const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seen: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Notification", schema);

module.exports = model;
