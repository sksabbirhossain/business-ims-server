const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createReturnSale,
  returnSales,
  deleteReturnSale,
} = require("../../../controller/admin/returnSale/returnSale");

const router = express.Router();

//get all return sales
router.get("/all", checkIsAdmin, returnSales);

//create return sale
router.post("/", checkIsAdmin, createReturnSale);

//delete return sale
router.delete("/:returnSalesId", checkIsAdmin, deleteReturnSale);

module.exports = router;
