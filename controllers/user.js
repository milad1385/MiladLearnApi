const { isValidObjectId } = require("mongoose");
const UserModel = require("../models/user");
const BanModel = require("../models/ban");
const registerValidator = require("../validators/register");
const ITEM_PER_PAGE = require("./../utils/constant");
const bcrypt = require("bcryptjs");

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;
    const users = await UserModel.find({}, "-password")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return res.json(users);
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(422).json({
        message: "Id is not valid",
      });
    }

    const isUserDeleted = await UserModel.findOneAndDelete({
      _id: id,
    });

    if (!isUserDeleted) {
      return res.status(404).json({ message: "user is not found" });
    }

    return res.json({
      message: "User deleted successfully :)",
    });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId()) {
      return res.status(422).json({
        message: "Id is not valid",
      });
    }

    const isValidBody = registerValidator(req.body);
    if (isValidBody !== true) {
      return res.status(422).json(isValidBody);
    }

    const { name, username, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          email,
          name,
          password: hashedPassword,
          phone,
          username,
        },
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User is not found !!! " });
    }

    return res.json({
      message: "User Updated successfully :)",
    });
  } catch (error) {
    next();
  }
};

exports.addUserToBanList = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.json({
        message: "ID is invalid",
      });
    }

    const user = await UserModel.findOne({ _id: id }).lean();

    const banUser = await BanModel.create({
      user: user._id,
      phone: user.phone,
    });

    return res.status(201).json({
      message: "User add to ban list successfully:)",
      user: banUser,
    });
  } catch (error) {
    next();
  }
};
