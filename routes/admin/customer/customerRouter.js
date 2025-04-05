const express = require("express");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getAllCustomer,
  getCustomer,
} = require("../../../controller/admin/customer/customerController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  customerValidators,
  customerValidationHandler,
} = require("../../../validators/admin/customer/customerValidators");
const { updateCustomerValidationHandler, updateCustomerValidators } = require("../../../validators/admin/customer/updateCustomerValidators");

const router = express.Router();

//get customers
router.get("/", checkIsAdmin, getCustomers);

//get all customer
router.get("/all", checkIsAdmin, getAllCustomer);

//get a customer by id
router.get("/:customerId", checkIsAdmin, getCustomer);

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
  updateCustomerValidators,
  updateCustomerValidationHandler,
  updateCustomer
);

//delete customer by id
router.delete("/:customerId", checkIsAdmin, deleteCustomer);

module.exports = router;
