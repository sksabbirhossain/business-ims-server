const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { searchStock, getStocks, getStock, createStock, updateStock, deleteStock } = require("../../controllers/stock/stockController");
const { stockValidators, stockValidationHandler } = require("../../validators/stock/stockValidators");
 

const router = express.Router();

//search a stock
router.get("/search", checkIsAdmin, checkIsSubscribed, searchStock);

//get all stock
router.get("/all", checkIsAdmin, checkIsSubscribed, getStocks);

//get a stock
router.get("/:stockId", checkIsAdmin, checkIsSubscribed, getStock);

//create a stock
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  stockValidators,
  stockValidationHandler,
  createStock
);

//update a stock by id
router.patch(
  "/update/:stockId",
  checkIsAdmin,
  checkIsSubscribed,
  stockValidators,
  stockValidationHandler,
  updateStock
);

//delete a stock by id
router.delete("/delete/:stockId", checkIsAdmin, checkIsSubscribed, deleteStock);

module.exports = router;
