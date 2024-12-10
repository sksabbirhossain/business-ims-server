const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
} = require("../../../controller/admin/category/categoryController");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../../../validators/admin/category/categoryValidators");

const router = express.Router();

//create category
router.post(
  "/add-category",
  checkIsAdmin,
  categoryValidators,
  categoryValidationHandler,
  createCategory
);

module.exports = router;
