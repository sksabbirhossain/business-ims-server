const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const { getPurchaseAndSales } = require("../../../controller/admin/dashboard/dashboardController");

const router = express.Router();

//get store 12 days sales and purchase
router.get("/purchase-sale", checkIsAdmin, getPurchaseAndSales);

module.exports = router;
