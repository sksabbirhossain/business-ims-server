/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const { superAdminValidators, superAdminValidationHandler } = require("../../validators/users/superAdminValidators");
const { createSuperAdmin, loginSuperAdmin } = require("../../controllers/users/superAdminController");
const { superAdminLoginValidators, superAdminLoginValidationHandler } = require("../../validators/users/superAdminLoginValidators");

 

const router = express.Router();

// create superAdmin
router.post(
  "/create-superadmin",
  superAdminValidators,
  superAdminValidationHandler,
  createSuperAdmin
);

//login superAdmin
router.post(
  "/login",
  superAdminLoginValidators,
  superAdminLoginValidationHandler,
  loginSuperAdmin
);

module.exports = router;
