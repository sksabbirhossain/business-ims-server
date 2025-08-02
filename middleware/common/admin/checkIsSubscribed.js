/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const Store = require("../../../modules/superAdmin/models/storeSchema");

const checkIsSubscribed = async (req, res, next) => {
  try {
    const storeId = req.store?.storeId;

    if (!storeId) {
      return res.status(403).json({
        errors: {
          common: {
            msg: "Store ID not found!",
          },
        },
        status: 403,
      });
    }

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Store not found!",
          },
        },
        status: 404,
      });
    }

    // Subscription Check Logic
    const currentDate = new Date();
    const expiryDate = new Date(store.subscription?.endDate);

    if (!store.subscription || expiryDate < currentDate) {
      if (store?.isActive) {
        // change store active status to false
        store.isActive = false;
        await store.save();
      }
      return res.status(403).json({
        errors: {
          common: {
            msg: "Your subscription has expired. Please renew to access this feature!",
          },
        },
        status: 403,
      });
    }

    // If everything is OK
    next();
  } catch (err) {
    return res.status(401).json({
      errors: {
        common: {
          msg: "Something went wrong!",
        },
      },
      status: 401,
    });
  }
};

module.exports = checkIsSubscribed;
