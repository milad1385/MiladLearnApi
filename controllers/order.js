const { isValidObjectId } = require("mongoose");
const RegisterCourseModel = require("../models/registerCourse");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await RegisterCourseModel.find({
      user: req.user._id,
    }).populate("course user", "title href name username");

    return res.json({ orders });
  } catch (error) {
    next();
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const order = await RegisterCourseModel.findOne({ _id: id })
      .populate("course user", "title href name username")
      .lean();

    return res.json(order);
  } catch (error) {
    next();
  }
};
