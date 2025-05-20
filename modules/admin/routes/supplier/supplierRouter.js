/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const {
  suppliers,
  getSupplier,
  updateSupplier,
  createSupplier,
  deleteSupplier,
} = require("../../controllers/supplier/supplierController");
const {
  supplierValidators,
  supplierValidationHandler,
} = require("../../validators/supplier/supplierValidators");

const router = express.Router();

//get all supplier
router.get("/suppliers", checkIsAdmin, checkIsSubscribed, suppliers);

//get a supplier
router.get("/:supplierId", checkIsAdmin, checkIsSubscribed, getSupplier);

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
