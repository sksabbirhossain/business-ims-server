const express = require("express");

const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createPurchase,
  getPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase,
} = require("../../../controller/admin/purchase/purchaseController");
const {
  purchaseValidators,
  purchaseValidationHandler,
} = require("../../../validators/admin/purchase/purchaseValidators");

const router = express.Router();

//get all purchase
router.get("/all", checkIsAdmin, getPurchases);

//get a purchase
router.get("/:purchaseId", checkIsAdmin, getPurchase);

//create a purchase
router.post(
  "/create",
  checkIsAdmin,
  purchaseValidators,
  purchaseValidationHandler,
  createPurchase
);

//update a purchase by id
router.patch(
  "/update/:purchaseId",
  checkIsAdmin,
  purchaseValidators,
  purchaseValidationHandler,
  updatePurchase
);

//delete a purchase by id
router.delete("/delete/:purchaseId", checkIsAdmin, deletePurchase);

module.exports = router;
