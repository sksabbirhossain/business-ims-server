const mongoose = require("mongoose");

const superAdminSchema = mongoose.Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "moderator"],
      default: "superAdmin",
    },
    picture: String,
    picture_info: {
      public_key: String,
    },
    verifyToken: String,
    forgetToken: String,
    verifiedUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = SuperAdmin;