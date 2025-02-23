const express = require("express");

const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createStock,
  getStocks,
  getStock,
  updateStock,
  deleteStock,
} = require("../../../controller/admin/stock/stockController");
const {
  stockValidators,
  stockValidationHandler,
} = require("../../../validators/admin/stock/stockValidators");

const router = express.Router();

//get all stock
router.get("/all", checkIsAdmin, getStocks);

//get a stock
router.get("/:stockId", checkIsAdmin, getStock);

//create a stock
router.post(
  "/create",
  checkIsAdmin,
  stockValidators,
  stockValidationHandler,
  createStock
);

//update a stock by id
router.patch(
  "/update/:stockId",
  checkIsAdmin,
  stockValidators,
  stockValidationHandler,
  updateStock
);

//delete a stock by id
router.delete("/delete/:stockId", checkIsAdmin, deleteStock);

module.exports = router;
