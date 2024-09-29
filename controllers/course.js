const CourseModel = require("../models/course");
const CategoryModel = require("../models/category");
const SessionModel = require("../models/session");
const courseValidator = require("../validators/course");
const sessionValidator = require("../validators/session");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res, next) => {
  try {
    const isValidBody = courseValidator(req.body);
    if (isValidBody !== true) {
      return res.status(422).json(isValidBody);
    }

    const {
      title,
      description,
      href,
      price,
      discount,
      status,
      support,
      category,
    } = req.body;

    const course = await CourseModel.create({
      title,
      description,
      href,
      cover: req.file.filename,
      price,
      discount,
      creator: req.user._id,
      status,
      support,
      category,
    });

    return res.status(201).json({
      message: "Course created successfully :)",
      course,
    });
  } catch (error) {
    next();
  }
};

exports.createSession = async (req, res, next) => {
  try {
    const isValidBody = sessionValidator(req.body);
    if (isValidBody !== true) {
      return res.status(422).json(isValidBody);
    }

    const { title, href, time, free } = req.body;

    const { courseId } = req.params;

    if (!isValidObjectId(courseId)) {
      return res.status(422).json({ message: "please send valid course id" });
    }

    const session = await SessionModel.create({
      title,
      href,
      time,
      free,
      course: courseId,
    });

    return res
      .status(201)
      .json({ message: "Session created successfully:)", session });
  } catch (error) {
    next();
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};

exports.getSessionInfo = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
};
