const express = require("express");
const router = express.Router();

// internal imports
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createSalesPayment,
} = require("../../../controller/admin/sales/salesController");

//create sales
router.post("/sales-pament", checkIsAdmin, createSalesPayment);

module.exports = router;
