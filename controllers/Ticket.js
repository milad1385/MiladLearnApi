const { isValidObjectId } = require("mongoose");
const TicketModel = require("../models/ticket");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { title, body, department, subDepartment, periority, course } =
      req.body;

    if (
      !title ||
      !body ||
      !isValidObjectId(department) ||
      !isValidObjectId(subDepartment)
    ) {
      return res.status(422).json({ message: "Please send valid data" });
    }

    const ticket = await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      periority,
      course,
      user: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Ticket created successfully:)", ticket });
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

    const ticket = await TicketModel.findOneAndDelete({ _id: id });

    if (!ticket) {
      return res.status(404).json({ message: "ticket is not found :(" });
    }

    return res.json({ message: "Ticket was deleted successfully :) " });
  } catch (error) {
    next();
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const tickets = await TicketModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("user course department subDepartment", "name username title");

    const countTicket = await TicketModel.countDocuments({});

    return res.json({ tickets, count: countTicket });
  } catch (error) {
    next();
  }
};

exports.answer = async (req, res, next) => {
  try {
    const { mainTicketId, body } = req.body;

    if (!isValidObjectId(mainTicketId)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    if (!body) {
      return res.status(420).json({ message: "Please send body :)" });
    }

    const mainTicket = await TicketModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          answer: true,
        },
      }
    );

    if (!mainTicket) {
      return res.status(404).json({ message: "Ticket is not found :( " });
    }

    const answerTicket = await TicketModel.create({
      title: mainTicket.title,
      body,
      department: mainTicket.department,
      subDepartment: mainTicket.subDepartment,
      periority: mainTicket.periority,
      course: mainTicket.course,
      user: req.user._id,
      isAnswer: true,
    });

    return res.json({
      message: "Answer to ticket send successfully :) ",
      answerTicket,
    });
  } catch (error) {
    next();
  }
};

exports.getUserTickets = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const tickets = await TicketModel.find({ user: req.user._id })
      .populate("user course department subDepartment", "name username title")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const ticketCount = await TicketModel.countDocuments({
      user: req.user._id,
    });

    return res.json({ tickets, count: ticketCount });
  } catch (error) {
    next();
  }
};

exports.getAnswer = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    if (!isValidObjectId(ticketId)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const mainTicket = await TicketModel.findOne({ _id: id })
      .populate("user course department subDepartment", "name username title")
      .lean();

    const answerTicket = await TicketModel.findOne({ parrent: ticketId });

    return res.json({ mainTicket, answerTicket });
  } catch (error) {
    next();
  }
};
