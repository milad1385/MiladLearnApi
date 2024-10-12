const { isValidObjectId } = require("mongoose");
const DiscountModel = require("../models/discount");
const CourseModel = require("../models/course");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { code, percent, maxUsage, course } = req.body;

    if (!code || !percent || !maxUsage || !isValidObjectId(course)) {
      return res.status(422).json({ message: "Please fill all of the fields" });
    }

    const discount = await DiscountModel.create({
      percent,
      code,
      maxUsage,
      creator: req.user._id,
      course,
    });

    return res
      .status(201)
      .json({ message: "Discount created successfully :)", discount });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const discounts = await DiscountModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const discountCount = await DiscountModel.countDocuments({});

    return res.json({ discounts, count: discountCount });
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

    const discount = await DiscountModel.findOneAndDelete({ _id: id });
    if (!discount) {
      return res.status(404).json({ message: "Discount not found :(" });
    }

    return res.json({ message: "discount deleted successfully:)", discount });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, percent, maxUsage, course } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const discount = await DiscountModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          code,
          maxUsage,
          percent,
          course,
        },
      }
    );

    if (!discount) {
      return res.status(404).json({ message: "discount not found" });
    }

    return res.json({ message: "discount updated successfully :)", discount });
  } catch (error) {
    next();
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const { code, courseId } = req.body;

    if (!code || !isValidObjectId(courseId)) {
      return res.status(422).json({ message: "Please fill all of the fields" });
    }

    const discount = await DiscountModel.findOne({ code }).lean();

    if (discount.course !== courseId) {
      return res.status(404).json({ message: "discount is not found" });
    } else if (discount.maxUsage === discount.usage) {
      return res.status(410).json({ message: "Code is expired :(" });
    } else {
      return res.json(discount);
    }
  } catch (error) {
    next();
  }
};

exports.setDiscountToAllCourses = async (req, res, next) => {
  try {
    const { percent } = req.body;

    if (!percent) {
      return res.status(422).json({ message: "Please send percent" });
    }

    await CourseModel.updateMany({
      discount: percent,
    });

    return res.json({ message: "discount set successfully " });
  } catch (error) {
    next();
  }
};
