const express = require("express");

const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const { createPurchase } = require("../../../controller/admin/purchase/purchaseController");

const router = express.Router();

//create a purchase
router.post("/create", checkIsAdmin, createPurchase);

module.exports = router;
