const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Category = require("../../../models/storeAdmin/categorySchema");

const categoryValidators = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const category = await Category.findOne({
          name: value,
          storeInfo: req.store.storeId,
        });
        if (category) {
          throw createError("Category is already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must-be 10 characters")
    .trim(),
];

const categoryValidationHandler = (req, res, next) => {
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
  categoryValidators,
  categoryValidationHandler,
};
