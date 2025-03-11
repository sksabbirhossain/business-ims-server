const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  getFinance,
} = require("../../../controller/admin/financial/financialController");

const router = express.Router();

router.get("/", checkIsAdmin, getFinance);

module.exports = router;
