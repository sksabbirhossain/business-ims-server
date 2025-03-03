const express = require("express");
const router = express.Router();

// internal imports
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createSalesPayment,
  getAllSales,
} = require("../../../controller/admin/sales/salesController");

//get all sales
router.get("/sales", checkIsAdmin, getAllSales);

//create sales
router.post("/sales-pament", checkIsAdmin, createSalesPayment);

module.exports = router;
