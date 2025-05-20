/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const {
  getCustomers,
  getAllCustomer,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../../controllers/customer/customerController");
const {
  customerValidators,
  customerValidationHandler,
} = require("../../validators/customer/customerValidators");
const {
  updateCustomerValidators,
  updateCustomerValidationHandler,
} = require("../../validators/customer/updateCustomerValidators");

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
