const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Category = require("../../../models/storeAdmin/categorySchema");

const supplierValidators = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must-be 3 characters")
    .trim(),
  check("shopName")
    .notEmpty()
    .withMessage("Shop name is required")
    .isLength({ min: 2 })
    .withMessage("Description must-be 2 characters")
    .trim(),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must-be 10 characters")
    .trim(),
  check("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email must-be a valid email address")
    .trim(),
  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone()
    .withMessage("Phone number must-be a valid number")
    .trim(),
  check("website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("URL must-be a valid url")
    .trim(),
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10 })
    .withMessage("Address must-be 10 characters")
    .trim(),
];

const supplierValidationHandler = (req, res, next) => {
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
  supplierValidators,
  supplierValidationHandler,
};
