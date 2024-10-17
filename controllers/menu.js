const { isValidObjectId } = require("mongoose");
const MenuModel = require("../models/menu");
const ITEM_PER_PAGE = require("../utils/constant");

exports.create = async (req, res, next) => {
  try {
    const { title, href, parrent } = req.body;

    if (!title || !href) {
      return res.status(422).json({ message: "Please send valid data" });
    }

    const menu = await MenuModel.create({
      title,
      href,
      parrent,
    });

    return res.json({ message: "Menu created successfully:)", menu });
  } catch (error) {
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const menu = await MenuModel.findOneAndDelete({ _id: id });

    if (!menu) {
      return res.status(404).json({ message: "menu is not found" });
    }

    return res.json({ message: "Menu deleted successfully :) " });
  } catch (error) {
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { href, parrent, title } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const menu = await MenuModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          href,
          parrent,
          title,
        },
      }
    );

    if (!menu) {
      return res.status(404).json({ message: "Menu is not found" });
    }

    return res.json({ message: "menu is updated successfully :)" });
  } catch (error) {
    next();
  }
};

exports.getAllMenus = async (req, res, next) => {
  try {
    const page = req.query?.page || 1;

    const menus = await MenuModel.find({})
      .populate("parrent", "title")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const menuCount = await MenuModel.countDocuments({});

    return res.json({ menus, count: menuCount });
  } catch (error) {
    next();
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const menus = await MenuModel.find({}).lean();
    const mainMenus = menus.filter((menu) => !menu.parrent);
    const subMenus = menus.filter((menu) => menu.parrent);

    const allMenus = mainMenus.map((menu) => {
      const matchedSubMenus = subMenus.filter(
        (sub) => String(sub?.parrent) === String(menu._id)
      );

      return {
        ...menu,
        subMenus: matchedSubMenus,
      };
    });

    return res.json(allMenus);
  } catch (error) {
    next();
  }
};
