const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["storeAdmin", "storeModerator"],
      default: "storeAdmin",
    },
    picture: String,
    picture_info: {
      public_key: String,
    },
    verifyToken: String,
    forgetToken: String,
    verifiedStore: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
