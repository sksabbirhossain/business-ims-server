/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const { storeLoginValidators, storeLoginValidationHandler } = require("../../validators/storeLogin/storeLoginValidators");
const { logInStore } = require("../../controllers/store/storeAdminController");
 

const router = express.Router();

//login as a store admin route
router.post(
  "/login",
  storeLoginValidators,
  storeLoginValidationHandler,
  logInStore
);

module.exports = router;
