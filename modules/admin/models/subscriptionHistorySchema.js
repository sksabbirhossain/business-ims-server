/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
// models/SubscriptionHistory.js
const mongoose = require("mongoose");

const subscriptionHistorySchema = new mongoose.Schema(
  {
    storeInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    paymentMethod: {
      type: String,
      enum: ["bkash", "nagad", "stripe", "card", "manual"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    durationInMonths: {
      type: Number,
      default: 1,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "failed", "refunded"],
      default: "paid",
    },
  },
  { timestamps: true }
);

const SubscriptionHistory = mongoose.model(
  "SubscriptionHistory",
  subscriptionHistorySchema
);

module.exports = SubscriptionHistory;
