const { isValidObjectId } = require("mongoose");
const ContactModel = require("../models/contact");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { name, email, phone, body } = req.body;

    if (!name || !email || !phone || !body) {
      return res.status(422).json({ msg: "Please fill all of the fields" });
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      body,
    });

    return res.json({ message: "Contact send successfully :)", contact });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const contacts = await ContactModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const count = await ContactModel.countDocuments({});

    return res.json({ contacts, count });
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

    const contact = await ContactModel.findByIdAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "Contact is not found :(" });
    }

    return res.json({ message: "Contact removed successfully:)" });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const { name, email, phone, body } = req.body;

    if (!name || !email || !phone || !body) {
      return res.status(422).json({ msg: "Please fill all of the fields" });
    }

    const contact = await ContactModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          phone,
          body,
        },
      }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact is not found :(" });
    }

    return res.json({ message: "Contact updated successfully:)" });
  } catch (error) {
    next();
  }
};
