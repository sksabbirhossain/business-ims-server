const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Employee = require("../../../models/storeAdmin/employeeSchema");

const employeeValidators = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must-be 3 characters")
    .trim(),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must-be a valid email address")
    .trim()
    .custom(async (value, { req }) => {
      let employee;
      try {
        employee = await Employee.findOne({
          email: value,
          storeInfo: req.store.storeId,
        });
      } catch (err) {
        throw createError("An error occurred during email validation");
      }
      if (employee) {
        throw createError("Employee Email is already exists");
      }
      return true;
    }),

  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .custom(async (value, { req }) => {
      if (!/^\d+$/.test(value)) {
        throw createError("Phone number must contain digits only");
      }
      let employee;
      try {
        employee = await Employee.findOne({
          phone: value,
          storeInfo: req.store.storeId,
        });
      } catch (err) {
        throw createError("An error occurred during phone validation");
      }

      if (employee) {
        throw createError("Employee phone number already exists");
      }

      return true;
    }),

  check("position").notEmpty().withMessage("Position is required").trim(),

  check("monthlySalary")
    .notEmpty()
    .withMessage("Monthly salary is required")
    .isNumeric()
    .withMessage("Monthly salary should be a number"),
];

const employeeValidationHandler = (req, res, next) => {
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
  employeeValidators,
  employeeValidationHandler,
};
