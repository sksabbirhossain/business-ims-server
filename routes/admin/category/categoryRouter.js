const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
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

//update a category by categoryId
router.patch(
  "/update-category/:categoryId",
  checkIsAdmin,
  categoryValidators,
  categoryValidationHandler,
  updateCategory
);

//create category
router.post(
  "/add-category",
  checkIsAdmin,
  categoryValidators,
  categoryValidationHandler,
  createCategory
);

module.exports = router;
