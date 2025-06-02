/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */

const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Store = require("../../../superAdmin/models/storeSchema");

const updateStoreProfileValidators = [
  check("storeName")
    .notEmpty()
    .withMessage("Store name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be more than 3 chars")
    .trim(),
  check("ownerName")
    .notEmpty()
    .withMessage("Owner name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be more than 3 chars")
    .trim(),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10 })
    .withMessage("Phone number must be more than 10 chars")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const existingStore = await Store.findOne({ phone: value });
        if (
          existingStore &&
          existingStore?._id.toString() !== req.store.storeId.toString()
        ) {
          throw createError("Phone number already in use!");
        }
        return true;
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("address").notEmpty().withMessage("Address is required").trim(),
];

const updateStoreProfileValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  updateStoreProfileValidators,
  updateStoreProfileValidationHandler,
};
