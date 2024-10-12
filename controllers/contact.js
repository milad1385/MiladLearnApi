const { isValidObjectId } = require("mongoose");
const nodemailer = require("nodemailer");
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

exports.answer = async (req , res  , next) => {
  try {
    const { email, body } = req.body;

    if (!email || !body) {
      return res.status(422).json({ message: "please fill all of the fields" });
    }
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "miladsalami1385@gmail.com",
        pass: "oeaw bnuz ptdk gemi",
      },
    });

    const mailOptions = {
      from: "miladsalami1385@gmail.com",
      to: email,
      subject: "پشتیبانی سایت",
      text: body,
    };

    transport.sendMail(mailOptions, async (err, info) => {
      if (err) {
        return res.json({ message: err });
      } else {
        const contact = await ContactModel.findOneAndUpdate(
          { email },
          {
            $set: {
              answer: 1,
            },
          }
        );
        return res
          .status(201)
          .json({ message: "Email answered successfully :)", contact });
      }
    });
  } catch (error) {
    next();
  }
};
