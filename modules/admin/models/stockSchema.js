const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    supplierInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    storeInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    sku: {
      type: String,
      // required: true,
      trim: true,
    },
    Barcode: {
      type: String,
      //   required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    uom: {
      type: String,
      enum: ["KG", "PIECE", "LITER"],
      required: true,
      uppercase: true,
    },
    picture: String,
    picture_info: {
      public_key: String,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
