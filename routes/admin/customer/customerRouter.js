const express = require("express");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
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
router.patch(
  "/:customerId",
  checkIsAdmin,
  customerValidators,
  customerValidationHandler,
  updateCustomer
);

//delete customer by id
router.delete("/:customerId", checkIsAdmin, deleteCustomer);

module.exports = router;
