const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createCategory,
} = require("../../../controller/admin/category/categoryController");

const router = express.Router();

//create category
router.post("/add-category", checkIsAdmin, createCategory);

module.exports = router;
