const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
  getCategories,
} = require("../../../controller/admin/category/categoryController");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../../../validators/admin/category/categoryValidators");

const router = express.Router();

//get all category
router.get("/category-list", checkIsAdmin, getCategories);

//create category
router.post(
  "/add-category",
  checkIsAdmin,
  categoryValidators,
  categoryValidationHandler,
  createCategory
);

module.exports = router;
