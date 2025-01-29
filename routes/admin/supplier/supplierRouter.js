const express = require("express");
const {
  createSupplier,
  suppliers,
  getSupplier,
  updateSupplier,
} = require("../../../controller/admin/supplier/supplierController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  supplierValidators,
  supplierValidationHandler,
} = require("../../../validators/admin/supplier/supplierValidators");

const router = express.Router();

//get all supplier
router.get("/suppliers", checkIsAdmin, suppliers);

//get a supplier
router.get("/supplier/:supplierId", checkIsAdmin, getSupplier);

//update a supplier by supplierId
router.post(
  "/update-supplier/:supplierId",
  checkIsAdmin,
  supplierValidators,
  supplierValidationHandler,
  updateSupplier
);

//create a supplier
router.post(
  "/create-supplier",
  checkIsAdmin,
  supplierValidators,
  supplierValidationHandler,
  createSupplier
);

module.exports = router;
