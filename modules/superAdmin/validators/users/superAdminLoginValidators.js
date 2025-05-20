/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const SuperAdmin = require("../../models/superAdminSchema");

const superAdminLoginValidators = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await SuperAdmin.findOne({ email: value });
        if (!user) {
          throw createError("Invalid credential");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Invalid password")
    .trim(),
];

const superAdminLoginValidationHandler = (req, res, next) => {
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
  superAdminLoginValidators,
  superAdminLoginValidationHandler,
};
