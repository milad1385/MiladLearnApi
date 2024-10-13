const CourseModel = require("../models/course");

exports.getSearch = async (req, res, next) => {
  try {
    const { keyword } = req.params;

    const courses = await CourseModel.find({
      title: { $regex: ".*" + keyword + "*." },
      description: { $regex: ".*" + keyword + "*." },
    });

    return res.json(courses);
  } catch (error) {
    next();
  }
};
