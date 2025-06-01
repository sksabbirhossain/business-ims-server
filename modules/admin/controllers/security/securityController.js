/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */

const bcrypt = require("bcrypt");
const Store = require("../../../superAdmin/models/storeSchema");

//change password controller
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    //validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Old password and new password are required",
          },
        },
      });
    }

    //check valid store
    const store = await Store.findOne({ email: req.store.email }).select(
      "+password"
    );
    if (!store) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Store not found.",
          },
        },
      });
    }

    //check hash of old password
    const isMatch = await bcrypt.compare(oldPassword, store.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Old password is incorrect",
          },
        },
      });
    }
    //set new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    store.password = hashedPassword;
    const result = await store.save();

    if (result._id) {
      res.status(200).json({
        data: result,
        msg: "Password changed successfully!",
      });
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "Failed to change password. Please try again.",
          },
        },
      });
    }
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};
module.exports = {
  changePassword,
};
