const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
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
      trim: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
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
      enum: ["KG", "PICES", "LITER"],
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
