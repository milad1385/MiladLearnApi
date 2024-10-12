const { isValidObjectId } = require("mongoose");
const NotificationModel = require("../models/notification");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { title, admin } = req.body;

    if (!isValidObjectId(admin) || !title) {
      return res
        .status(422)
        .json({ message: "please send field correctly :)" });
    }

    const notification = await NotificationModel.create({
      title,
      admin,
    });

    return res
      .status(201)
      .json({ message: "Notification created successfully :)", notification });
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

    const notification = await NotificationModel.findOneAndDelete({ _id: id });

    if (!notification) {
      return res.status(404).json({ message: "notification not found :(" });
    }

    return res.json({ message: "notification deleted success fully:)" });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, admin } = req.body;

    if (!isValidObjectId(id) || !title || !isValidObjectId(admin)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const notification = await NotificationModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          admin,
        },
      }
    );

    if (!notification) {
      return res.status(404).json({ message: "notification not found :(" });
    }

    return res.json({ message: "Notification updated successfully :)" });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;
    const notifications = await NotificationModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const notificationCount = await NotificationModel.countDocuments({});

    return res.json({ notifications, count: notificationCount });
  } catch (error) {
    next();
  }
};

exports.getAdminNotifications = async (req, res, next) => {
  try {
    const notifications = await NotificationModel.find({
      admin: req.user._id,
    });

    return res.json(notifications);
  } catch (error) {
    next();
  }
};
