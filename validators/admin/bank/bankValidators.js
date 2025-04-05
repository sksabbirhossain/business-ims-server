const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Bank = require("../../../models/storeAdmin/bankSchema");

const bankValidators = [
  check("name").notEmpty().withMessage("Name is required").trim(),
  check("accountNumber")
    .notEmpty()
    .withMessage("Account Number is required")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const bank = await Bank.findOne({
          name: value,
          storeInfo: req.store.storeId,
        });
        if (bank) {
          throw createError("Bank account number is already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
];

const bankValidationHandler = (req, res, next) => {
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
  bankValidators,
  bankValidationHandler,
};
