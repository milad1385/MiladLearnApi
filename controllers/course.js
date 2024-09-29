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

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "please send valid course id" });
    }

    const session = await SessionModel.create({
      title,
      href,
      time,
      free,
      course: courseId,
      video: req.file.filename,
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
    const sessions = await SessionModel.find({});

    res.json(sessions);
  } catch (error) {
    next();
  }
};

exports.getSessionInfo = async (req, res, next) => {
  console.log(req.params);

  try {
    const { sessionId } = req.params;

    if (!isValidObjectId(sessionId)) {
      return res.status(422).json({ message: "please send valid id" });
    }

    const session = await SessionModel.findOne({ _id: sessionId });
    const sessions = await SessionModel.find({ course: session.course });

    return res.json({ sessionInfo: session, sessions });
  } catch (error) {
    next();
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.find({}).populate(
      "creator category",
      "title name"
    );

    return res.json(courses);
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
