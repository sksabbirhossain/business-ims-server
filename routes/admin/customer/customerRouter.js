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
const {
  updateCustomerValidationHandler,
  updateCustomerValidators,
} = require("../../../validators/admin/customer/updateCustomerValidators");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

//get customers
router.get("/", checkIsAdmin, checkIsSubscribed, getCustomers);

//get all customer
router.get("/all", checkIsAdmin, checkIsSubscribed, getAllCustomer);

//get a customer by id
router.get("/:customerId", checkIsAdmin, checkIsSubscribed, getCustomer);

//create customer
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  customerValidators,
  customerValidationHandler,
  createCustomer
);

//update customer by id
router.patch(
  "/:customerId",
  checkIsAdmin,
  checkIsSubscribed,
  updateCustomerValidators,
  updateCustomerValidationHandler,
  updateCustomer
);

//delete customer by id
router.delete("/:customerId", checkIsAdmin, checkIsSubscribed, deleteCustomer);

module.exports = router;
