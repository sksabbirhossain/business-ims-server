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
const { createStore, getAllStores } = require("../../controllers/stores/storeController");

const router = express.Router();

//get all stores route
router.get("/store-list", getAllStores);

//create store route
router.post(
  "/create-store",
  createStoreValidators,
  createStoreValidationHandler,
  createStore
);

module.exports = router;
