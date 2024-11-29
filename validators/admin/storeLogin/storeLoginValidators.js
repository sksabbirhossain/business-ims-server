const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Store = require("../../../models/superAdmin/stores/storeSchema");

const storeLoginValidators = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await Store.findOne({ email: value });
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

const storeLoginValidationHandler = (req, res, next) => {
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
  storeLoginValidators,
  storeLoginValidationHandler,
};
