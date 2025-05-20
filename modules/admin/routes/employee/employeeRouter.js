const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { getEmployees, getEmployee, createEmployee, addEmployeeSalary, updateEmployee, deleteEmployeeSalary, deleteEmployee } = require("../../controllers/employee/employeeController");
const { employeeValidators, employeeValidationHandler } = require("../../validators/employee/employeeValidators");
 

const router = express.Router();

//get employee with pagination
router.get("/employee-list", checkIsAdmin, checkIsSubscribed, getEmployees);

// get a employee by employeeId
router.get("/:employeeId", checkIsAdmin, checkIsSubscribed, getEmployee);

//create employee
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  employeeValidators,
  employeeValidationHandler,
  createEmployee
);

//add monthly salary
router.post("/add-salary", checkIsAdmin, checkIsSubscribed, addEmployeeSalary);

//update a employee by employeeId
router.patch(
  "/update-employee/:employeeId",
  checkIsAdmin,
  checkIsSubscribed,
  updateEmployee
);

// delete a employee monthly salary by employeeId
router.delete(
  "/delete-salary",
  checkIsAdmin,
  checkIsSubscribed,
  deleteEmployeeSalary
);

// delete a employee by employeeId
router.delete(
  "/delete-employee/:employeeId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteEmployee
);

module.exports = router;
