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
  getDueSales,
  searchDueSalesByNameTrxId,
} = require("../../../controller/admin/sales/salesController");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

//get all sales
router.get("/sales", checkIsAdmin, checkIsSubscribed, getAllSales);

//get due sales
router.get("/due-list", checkIsAdmin, checkIsSubscribed, getDueSales);

//get sales by trx id
router.get(
  "/sales/search",
  checkIsAdmin,
  checkIsSubscribed,
  searchSalesByTrxId
);

//get due sales by trx id or customer name
router.get(
  "/due/search",
  checkIsAdmin,
  checkIsSubscribed,
  searchDueSalesByNameTrxId
);

//get a single sales
router.get("/sales/:salesId", checkIsAdmin, checkIsSubscribed, getSale);

//create sales
router.post(
  "/sales-pament",
  checkIsAdmin,
  checkIsSubscribed,
  createSalesPayment
);

//delete sales
router.delete("/sales/:salesId", checkIsAdmin, checkIsSubscribed, deleteSale);

module.exports = router;
