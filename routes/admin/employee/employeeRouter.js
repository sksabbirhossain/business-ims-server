const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createEmployee,
  getEmployees,
  getEmployee,
} = require("../../../controller/admin/employee/employeeController");
const {
  employeeValidators,
  employeeValidationHandler,
} = require("../../../validators/admin/employee/employeeValidators");

const router = express.Router();

//get employee with pagination
router.get("/employee-list", checkIsAdmin, getEmployees);

// get a employee by employeeId
router.get("/:employeeId", checkIsAdmin, getEmployee);

//create employee
router.post(
  "/create",
  checkIsAdmin,
  employeeValidators,
  employeeValidationHandler,
  createEmployee
);

module.exports = router;
