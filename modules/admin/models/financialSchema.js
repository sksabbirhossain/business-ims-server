/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const mongoose = require("mongoose");

const financialsSchema = new mongoose.Schema(
  {
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
      unique: true, // One financial record per store
    },
    totalPurchaseCost: {
      type: Number,
      default: 0,
    }, // Total cost of purchased stock
    totalSalesRevenue: {
      type: Number,
      default: 0,
    }, // Total revenue from sales
    totalProfit: {
      type: Number,
      default: 0,
    }, // Profit calculation
    totalExpenses: {
      type: Number,
      default: 0,
    },
    totalReturns: {
      type: Number,
      default: 0,
    },
    totalDue: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Financial = mongoose.model("Financial", financialsSchema);

module.exports = Financial;
