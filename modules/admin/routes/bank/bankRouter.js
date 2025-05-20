/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { getBanks, getAllBanks, getbank, updateBank, createBank, deleteBank } = require("../../controllers/bank/bankController");
const { bankValidators, bankValidationHandler } = require("../../validators/bank/bankValidators");


const router = express.Router();

//get banks with pagination
router.get("/bank-list", checkIsAdmin, checkIsSubscribed, getBanks);

//get all bank
router.get("/all", checkIsAdmin, checkIsSubscribed, getAllBanks);

// get a bank by bankId
router.get("/:bankId", checkIsAdmin, checkIsSubscribed, getbank);

//update a bank by bankId
router.patch(
  "/update-bank/:bankId",
  checkIsAdmin,
  checkIsSubscribed,
  bankValidators,
  bankValidationHandler,
  updateBank
);

//create bank
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  bankValidators,
  bankValidationHandler,
  createBank
);

// delete a bank by bankId
router.delete(
  "/delete-bank/:bankId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteBank
);

module.exports = router;
