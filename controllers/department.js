const { isValidObjectId } = require("mongoose");
const DepartmentModel = require("../models/department");
const SubDeartmentModel = require("../models/subDepartment");

exports.createDepartment = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(422).json({ message: "Please send title !!!" });
    }

    const department = await DepartmentModel.create({
      title,
    });

    return res
      .status(201)
      .json({ message: "department created successfully :)", department });
  } catch (error) {
    next();
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const department = await DepartmentModel.findOneAndDelete({ _id: id });

    if (!department) {
      return res.status(404).json({ message: "Department is not found :(" });
    }

    return res.json({ message: "Department deleted successfully :)" });
  } catch (error) {
    next();
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    if (!title) {
      return res.status(422).json({ message: "Please send title !!!" });
    }

    const department = await DepartmentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
        },
      }
    );

    if (!department) {
      return res.status(404).json({ message: "Department is not found :( " });
    }

    return res.json({ message: "departement updated successfully :)" });
  } catch (error) {
    next();
  }
};

exports.createSubDepartment = async (req, res, next) => {
  try {
    const { departmentId, title } = req.body;

    if (!isValidObjectId(departmentId) || !title) {
      return res.status(422).json({ message: "Please send valid data" });
    }

    const subDepartment = await SubDeartmentModel.create({
      department: departmentId,
      title,
    });

    return res.status(201).json({
      message: "Sub Department created successfully :)",
      subDepartment,
    });
  } catch (error) {
    next();
  }
};

exports.deleteSubDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    const subDepartment = await DepartmentModel.findOneAndDelete({ _id: id });

    if (!subDepartment) {
      return res
        .status(404)
        .json({ message: "Sub department is not found !!!" });
    }

    return res.json({ message: "Sub Department deleted successfully :)" });
  } catch (error) {
    next();
  }
};

exports.updateSubDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "Please send valid id" });
    }

    if (!title) {
      return res.status(422).json({ message: "Please send title !!!" });
    }

    const subDepartment = await SubDeartmentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
        },
      }
    );

    if (!subDepartment) {
      return res
        .status(404)
        .json({ message: "subDepartment is not found :( " });
    }

    return res.json({ message: "subDepartment updated successfully :)" });
  } catch (error) {
    next();
  }
};

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await DepartmentModel.find({}).lean();

    return res.json(departments);
  } catch (error) {
    next();
  }
};

exports.getSpecificSubDepartments = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    if (!isValidObjectId(departmentId)) {
      return res
        .status(422)
        .json({ message: "please send valid department id" });
    }

    const allSubDepartments = await SubDeartmentModel.find({
      department: departmentId,
    });

    return res.json(allSubDepartments);
  } catch (error) {
    next();
  }
};
