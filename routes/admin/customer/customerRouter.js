const express = require("express");
const {
  createCustomer,
} = require("../../../controller/admin/customer/customerController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");

const router = express.Router();

//create customer
router.post("/create", checkIsAdmin, createCustomer);

module.exports = router;
