const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Customer = require("../../../models/storeAdmin/customerSchema");

const updateCustomerValidators = [
  check("name").notEmpty().withMessage("Name is required").trim(),
  check("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email must-be a valid email address")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const customer = await Customer.findOne({
          email: value,
          storeInfo: req.store.storeId,
        });
        if (customer && customer?._id != req.params?.customerId) {
          throw createError("Customer Email is already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone should be numbers")
    .isLength({ min: 11 })
    .withMessage("Phone number must-be 11 characters")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const customer = await Customer.findOne({
          phone: value,
          storeInfo: req.store.storeId,
        });
        if (customer && customer?._id != req.params?.customerId) {
          throw createError("Customer phone number is already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 3 })
    .withMessage("Address must-be 3 characters")
    .trim(),
];

const updateCustomerValidationHandler = (req, res, next) => {
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
  updateCustomerValidators,
  updateCustomerValidationHandler,
};
