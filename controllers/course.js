const CourseModel = require("../models/course");
const CategoryModel = require("../models/category");
const SessionModel = require("../models/session");
const courseValidator = require("../validators/course");
const sessionValidator = require("../validators/session");
const CommentModel = require("../models/comment");
const RegisterCourse = require("../models/registerCourse");
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
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "please send valid id" });
    }

    const session = await SessionModel.findOneAndDelete({ _id: id });
    if (!session) {
      return res.status(404).json({ message: "session is not found !!!" });
    }

    return res.json({ message: "session deleted successfully:)" });
  } catch (error) {
    next();
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "please send valid id" });
    }

    const course = await CourseModel.findOneAndDelete({ _id: id });
    if (!course) {
      return res.status(404).json({ message: "course is not found !!!" });
    }

    return res.json({ message: "course deleted successfully:)" });
  } catch (error) {
    next();
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "please send valid id" });
    }
  } catch (error) {
    next();
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { href } = req.params;

    if (!href) {
      return res.json({ message: "please send course href !!!" });
    }

    const course = await CourseModel.findOne({ href })
      .populate("category creator", "title href name -_id")
      .lean();

    const sessions = await SessionModel.find({ course: course._id }).lean();

    const comments = await CommentModel.find({
      isAccept: 1,
      course: course._id,
    })
      .populate("user", "name username -_id")
      .lean();

    const mainComments = comments.filter((comment) => !comment.isAnswer);
    const replyComments = comments.filter((comment) => comment.isAnswer);
    console.log(replyComments);
    

    const isUserRegister = !!(await RegisterCourse.findOne({
      user: req.user._id,
      course: course._id,
    }));

    const usersRegisterCount = await RegisterCourse.countDocuments({
      course: course._id,
    });

    let allComments = mainComments.map((comment) => {
      const matchedComments = replyComments.filter(
        (reply) => String(reply.mainCommentId) === String(comment._id)
      );

      return {
        ...comment,
        replies: matchedComments,
      };
    });

    return res.json({
      course,
      comments: allComments,
      sessions,
      isUserRegister,
      usersRegisterCount,
    });
  } catch (error) {
    next();
  }
};

exports.getCourseByCategory = async (req, res, next) => {
  try {
    const { href } = req.params;

    if (!href) {
      return res.json({ message: "please send category href !!!" });
    }

    const category = await CategoryModel.findOne({ href });

    const courses = await CourseModel.find({ category: category._id });

    if (courses.length) {
      return res.json(courses);
    } else {
      return res.json([]);
    }
  } catch (error) {
    next();
  }
};

exports.registerUserInCourse = async (req, res, next) => {
  try {
    const { courseId, price } = req.body;

    if (!courseId || !price) {
      return res.status(422).json({ message: "PLease send valid property" });
    }

    const registerUser = await RegisterCourse.create({
      course: courseId,
      user: req.user._id,
      price,
    });

    return res.json(201).json({ message: "user resgister successfully :)" });
  } catch (error) {
    next();
  }
};
