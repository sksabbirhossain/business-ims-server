/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const mongoose = require("mongoose");

const bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
