const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../../../controller/admin/category/categoryController");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../../../validators/admin/category/categoryValidators");

const router = express.Router();

//get all category
router.get("/category-list", checkIsAdmin, getCategories);
// get a category by categoryId
router.get("/category/:categoryId", checkIsAdmin, getCategory);

//create category
router.post(
  "/add-category",
  checkIsAdmin,
  categoryValidators,
  categoryValidationHandler,
  createCategory
);

module.exports = router;
