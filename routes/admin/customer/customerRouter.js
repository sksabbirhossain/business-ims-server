const express = require("express");
const {
  createCustomer,
} = require("../../../controller/admin/customer/customerController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  customerValidators,
  customerValidationHandler,
} = require("../../../validators/admin/customer/customerValidators");

const router = express.Router();

//create customer
router.post(
  "/create",
  checkIsAdmin,
  customerValidators,
  customerValidationHandler,
  createCustomer
);

module.exports = router;
