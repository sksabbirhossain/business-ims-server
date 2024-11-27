const mongoose = require("mongoose");

const storeAdminSchema = mongoose.Schema(
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
    storeImg: String,
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

const StoreAdmin = mongoose.model("StoreAdmin", storeAdminSchema);

module.exports = StoreAdmin;
