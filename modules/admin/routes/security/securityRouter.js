/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */

const express = require("express");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const { changePassword } = require("../../controllers/security/securityController");

const router = express.Router();

//change password
router.post(
  "/change-password",
  checkIsAdmin,
  checkIsSubscribed,
  changePassword
);

module.exports = router;
