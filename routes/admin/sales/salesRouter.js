const express = require("express");
const router = express.Router();

// internal imports
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createSalesPayment,
  getAllSales,
  getSale,
  deleteSale,
  searchSalesByTrxId,
} = require("../../../controller/admin/sales/salesController");

//get all sales
router.get("/sales", checkIsAdmin, getAllSales);

//get sales by trx id
router.get("/sales/search", checkIsAdmin, searchSalesByTrxId);

//get a single sales
router.get("/sales/:salesId", checkIsAdmin, getSale);

//create sales
router.post("/sales-pament", checkIsAdmin, createSalesPayment);

//delete sales
router.delete("/sales/:salesId", checkIsAdmin, deleteSale);

module.exports = router;
