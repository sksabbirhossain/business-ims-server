/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const {
  createStoreValidators,
  createStoreValidationHandler,
} = require("../../validators/stores/createStoreValidators");
const {
  createStore,
  getAllStores,
  getStoreById,
  updateStoreStatus,
} = require("../../controllers/stores/storeController");
const checkIsSuperAdmin = require("../../../../middleware/common/superAdmin/checkIsSuperAdmin");

const router = express.Router();

//get all stores route
router.get("/store-list", checkIsSuperAdmin, getAllStores);

// get store by ID route
router.get("/store-details/:storeId", checkIsSuperAdmin, getStoreById);

// update store status route
router.patch(
  "/update-store-status/:storeId",
  checkIsSuperAdmin,
  updateStoreStatus
);

//create store route
router.post(
  "/create-store",
  checkIsSuperAdmin,
  createStoreValidators,
  createStoreValidationHandler,
  createStore
);

module.exports = router;
