const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  getPurchaseAndSales,
  lastYearBuyAndSales,
} = require("../../../controller/admin/dashboard/dashboardController");

const router = express.Router();

//get store 12 days sales and purchase
router.get("/purchase-sale", checkIsAdmin, getPurchaseAndSales);

//get last year buy and sales ammount
router.get("/buy-sale", checkIsAdmin, lastYearBuyAndSales);

module.exports = router;
