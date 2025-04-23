const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createEmployee,
} = require("../../../controller/admin/employee/employeeController");
const { employeeValidators, employeeValidationHandler } = require("../../../validators/admin/employee/employeeValidators");

const router = express.Router();

//create employee
router.post("/create", checkIsAdmin,employeeValidators,employeeValidationHandler, createEmployee);

module.exports = router;
