const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  getFinance,
} = require("../../../controller/admin/financial/financialController");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

router.get("/", checkIsAdmin, checkIsSubscribed, getFinance);

module.exports = router;
