/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
// superAdmin/index.js
const express = require("express");
const router = express.Router();

router.use("/users", require("./routes/users/superAdminRouter"));
router.use("/stores", require("./routes/stores/storeRouter"));

module.exports = router;
