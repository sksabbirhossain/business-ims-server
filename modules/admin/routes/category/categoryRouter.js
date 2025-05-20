/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../../controllers/category/categoryController");
const {
  categoryValidators,
  categoryValidationHandler,
} = require("../../validators/category/categoryValidators");

const router = express.Router();

//get all category
router.get("/category-list", checkIsAdmin, checkIsSubscribed, getCategories);

// get a category by categoryId
router.get("/:categoryId", checkIsAdmin, checkIsSubscribed, getCategory);

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
