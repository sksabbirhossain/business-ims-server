const express = require("express");
const {
  createSupplier,
} = require("../../../controller/admin/supplier/supplierController");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");

const router = express.Router();

//create a supplier
router.post("/create-supplier", checkIsAdmin, createSupplier);

module.exports = router;
