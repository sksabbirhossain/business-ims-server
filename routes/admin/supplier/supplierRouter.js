const express = require("express");
const {
  createSupplier,
  suppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../../../controller/admin/supplier/supplierController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  supplierValidators,
  supplierValidationHandler,
} = require("../../../validators/admin/supplier/supplierValidators");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

//get all supplier
router.get("/suppliers", checkIsAdmin, checkIsSubscribed, suppliers);

//get a supplier
router.get(
  "/supplier/:supplierId",
  checkIsAdmin,
  checkIsSubscribed,
  getSupplier
);

//update a supplier by supplierId
router.post(
  "/update-supplier/:supplierId",
  checkIsAdmin,
  checkIsSubscribed,
  supplierValidators,
  supplierValidationHandler,
  updateSupplier
);

//create a supplier
router.post(
  "/create-supplier",
  checkIsAdmin,
  checkIsSubscribed,
  supplierValidators,
  supplierValidationHandler,
  createSupplier
);

//delete a supplier
router.delete(
  "/delete-supplier/:supplierId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteSupplier
);

module.exports = router;
