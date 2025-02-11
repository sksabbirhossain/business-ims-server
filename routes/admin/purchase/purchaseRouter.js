const express = require("express");

const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createPurchase,
} = require("../../../controller/admin/purchase/purchaseController");
const {
  purchaseValidators,
  purchaseValidationHandler,
} = require("../../../validators/admin/purchase/purchaseValidators");

const router = express.Router();

//create a purchase
router.post(
  "/create",
  checkIsAdmin,
  purchaseValidators,
  purchaseValidationHandler,
  createPurchase
);

module.exports = router;
