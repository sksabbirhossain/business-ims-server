const express = require("express");
const {
  createSupplier,
} = require("../../../controller/admin/supplier/supplierController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  supplierValidators,
  supplierValidationHandler,
} = require("../../../validators/admin/supplier/supplierValidators");

const router = express.Router();

//create a supplier
router.post(
  "/create-supplier",
  checkIsAdmin,
  supplierValidators,
  supplierValidationHandler,
  createSupplier
);

module.exports = router;
