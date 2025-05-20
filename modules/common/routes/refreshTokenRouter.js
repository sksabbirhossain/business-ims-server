/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const { checkUser } = require("../controllers/refreshTokenController");

 

const router = express.Router();

//refresh token
router.post("/me", checkUser);

module.exports = router;
