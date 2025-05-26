/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */

const mongoose = require("mongoose");
/**
 * DuePaymentSchema is a Mongoose schema for managing due payments in the system.
 * It includes fields for store information, transaction ID, sale ID, customer name,
 * payment date, and amount. The schema is designed to track payments made against
 * sales that have not been fully paid at the time of the sale.
 */
const DuePaymentSchema = new mongoose.Schema(
  {
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    trxid: {
      type: String,
      required: true,
    },
    saleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "N/A",
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const DuePayment = mongoose.model("DuePayment", DuePaymentSchema);

module.exports = DuePayment;
