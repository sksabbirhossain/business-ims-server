const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { getPurchases, getPurchase, createPurchase, updatePurchase, deletePurchase } = require("../../controllers/purchase/purchaseController");
const { purchaseValidationHandler, purchaseValidators } = require("../../validators/purchase/purchaseValidators");

 

const router = express.Router();

//get all purchase
router.get("/all", checkIsAdmin, checkIsSubscribed, getPurchases);

//get a purchase
router.get("/:purchaseId", checkIsAdmin, checkIsSubscribed, getPurchase);

//create a purchase
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  purchaseValidators,
  purchaseValidationHandler,
  createPurchase
);

//update a purchase by id
router.patch(
  "/update/:purchaseId",
  checkIsAdmin,
  checkIsSubscribed,
  purchaseValidators,
  purchaseValidationHandler,
  updatePurchase
);

//delete a purchase by id
router.delete(
  "/delete/:purchaseId",
  checkIsAdmin,
  checkIsSubscribed,
  deletePurchase
);

module.exports = router;
