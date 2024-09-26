const registerValidator = require("../validators/register");
const loginValidator = require("../validators/login");
const UserModel = require("../models/user");
const BanUserModel = require("../models/ban");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const isValidBody = registerValidator(req.body);

    if (isValidBody !== true) {
      return res.status(422).json(isValidBody);
    }

    const { name, username, email, phone, password } = req.body;

    const isUserExist = await UserModel.findOne({
      $or: [{ username, email, phone }],
    });

    const isUserBan = await BanUserModel.findOne({ phone });

    if (isUserBan) {
      return res.status(410).json({
        message: "This phone number is already baned !!!",
      });
    }

    if (isUserExist) {
      return res.status(409).json({
        message: "this user is already exist !!!!",
      });
    }

    const usersCount = await UserModel.countDocuments({});

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      phone,
      username,
      role: usersCount > 0 ? "USER" : "ADMIN",
    });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ user, accessToken });
  } catch (error) {
    next();
  }
};

exports.login = async (req, res, next) => {
  try {
    const isValidBody = loginValidator(req.body);
    if (isValidBody !== true) {
      return res.status(422).json(isValidBody);
    }

    const { identifier, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found !!!" });
    }

    const isUserBan = await BanUserModel.findOne({ phone : user.phone });

    if (isUserBan) {
      return res.status(410).json({
        message: "This phone number is already baned !!!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({ message: "Password is incorrect !!!" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ user, accessToken });
  } catch (error) {
    next();
  }
};

exports.me = async (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (error) {
    next();
  }
};
