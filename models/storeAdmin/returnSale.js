const mongoose = require("mongoose");

const ReturnSaleSchema = new mongoose.Schema(
  {
    trxid: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    qty: {
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
