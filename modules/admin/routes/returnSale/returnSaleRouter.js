const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { returnSales, createReturnSale, deleteReturnSale } = require("../../controllers/returnSale/returnSale");
 

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
