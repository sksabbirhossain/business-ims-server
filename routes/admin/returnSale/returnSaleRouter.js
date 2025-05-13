const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createReturnSale,
  returnSales,
  deleteReturnSale,
} = require("../../../controller/admin/returnSale/returnSale");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

//get all return sales
router.get("/all", checkIsAdmin, checkIsSubscribed, returnSales);

//create return sale
router.post("/", checkIsAdmin, checkIsSubscribed, createReturnSale);

//delete return sale
router.delete(
  "/:returnSalesId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteReturnSale
);

module.exports = router;
