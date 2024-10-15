const express = require("express");
const departmentController = require("../controllers/department");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware,
    isAdminMiddleware,
    departmentController.createDepartment
  )
  .get(departmentController.getAllDepartments);

router
  .route("/:id")
  .delete(
    authMiddleware,
    isAdminMiddleware,
    departmentController.deleteDepartment
  )
  .put(
    authMiddleware,
    isAdminMiddleware,
    departmentController.updateDepartment
  );

router
  .route("/sub/:id")
  .delete(
    authMiddleware,
    isAdminMiddleware,
    departmentController.deleteSubDepartment
  )
  .put(
    authMiddleware,
    isAdminMiddleware,
    departmentController.updateDepartment
  );

router
  .route("/sub")
  .post(
    authMiddleware,
    isAdminMiddleware,
    departmentController.createSubDepartment
  );

router
  .route("/:departmentId/subs")
  .get(departmentController.getSpecificSubDepartments);

module.exports = router;
