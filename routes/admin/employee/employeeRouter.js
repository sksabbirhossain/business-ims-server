const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createEmployee,
} = require("../../../controller/admin/employee/employeeController");

const router = express.Router();

//create employee
router.post("/create", checkIsAdmin, createEmployee);

module.exports = router;
