const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Ban", schema);

module.exports = model;
