const express = require("express");
const {
  createCustomer,
  updateCustomer,
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

//update customer by id
router.post(
  "/:customerId",
  checkIsAdmin,
  customerValidators,
  customerValidationHandler,
  updateCustomer
);

module.exports = router;
