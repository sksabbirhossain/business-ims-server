const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../../../controller/admin/category/categoryController");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../../../validators/admin/category/categoryValidators");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

//get all category
router.get("/category-list", checkIsAdmin, checkIsSubscribed, getCategories);

// get a category by categoryId
router.get(
  "/category/:categoryId",
  checkIsAdmin,
  checkIsSubscribed,
  getCategory
);

//update a category by categoryId
router.patch(
  "/update-category/:categoryId",
  checkIsAdmin,
  checkIsSubscribed,
  categoryValidators,
  categoryValidationHandler,
  updateCategory
);

//create category
router.post(
  "/add-category",
  checkIsAdmin,
  checkIsSubscribed,
  categoryValidators,
  categoryValidationHandler,
  createCategory
);

// delete a category by categoryId
router.delete(
  "/delete-category/:categoryId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteCategory
);

module.exports = router;
