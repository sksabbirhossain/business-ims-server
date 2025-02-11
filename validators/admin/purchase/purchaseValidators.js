const { validationResult, check } = require("express-validator");
const createError = require("http-errors");

const Category = require("../../../models/storeAdmin/categorySchema");

const purchaseValidators = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must-be 3 characters")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must-be 10 characters")
    .trim(),

  check("category").notEmpty().withMessage("Category is required"),

  check("uom").notEmpty().withMessage("Unit of Measure is required"),

  check("purchasePrice")
    .notEmpty()
    .withMessage("Purchase Price is required")
    .isInt({ min: 1 })
    .withMessage("Purchase Price must be greater than 0"),

  check("sellingPrice")
    .notEmpty()
    .withMessage("Selling Price is required")
    .isInt({ min: 1 })
    .withMessage("Selling Price must be greater than 0"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity Price is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must more than 0"),

  check("supplierInfo").notEmpty().withMessage("Supplier is required"),
];

const purchaseValidationHandler = (req, res, next) => {
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
  purchaseValidators,
  purchaseValidationHandler,
};
