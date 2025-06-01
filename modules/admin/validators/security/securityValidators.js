/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const securityValidators = [
  check("oldPassword")
    .notEmpty()
    .withMessage("Old password is required")
    .trim(),

  check("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw createError("Old password and new password cannot be the same");
      }
      return true;
    })
    .trim(),
  check("confirmNewPassword")
    .notEmpty()
    .withMessage("Confirm new password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw createError("New password and confirm new password do not match");
      }
      return true;
    })
    .trim(),
];

const securityValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  securityValidators,
  securityValidationHandler,
};
