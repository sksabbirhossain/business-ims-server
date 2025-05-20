/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const mongoose = require("mongoose");

const ReturnSaleSchema = new mongoose.Schema(
  {
    trxid: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    sales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    storeInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    returnedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ReturnSale = mongoose.model("ReturnSale", ReturnSaleSchema);

module.exports = ReturnSale;
