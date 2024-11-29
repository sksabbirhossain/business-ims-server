const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Store = require("../../../models/superAdmin/stores/storeSchema");

const createStoreValidators = [
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
    .custom(async (value) => {
      try {
        const user = await Store.findOne({ phone: value });
        if (user) {
          throw createError("Phone number already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await Store.findOne({ email: value });
        if (user) {
          throw createError("Email already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("address").notEmpty().withMessage("Address is required").trim(),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    )
    .trim(),
];

const createStoreValidationHandler = (req, res, next) => {
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
  createStoreValidators,
  createStoreValidationHandler,
};
