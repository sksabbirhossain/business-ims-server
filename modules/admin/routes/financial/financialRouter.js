const express = require("express");
const checkIsAdmin = require("../../../../middleware/common/admin/checkIsAdmin");
const checkIsSubscribed = require("../../../../middleware/common/admin/checkIsSubscribed");
const { getFinance } = require("../../controllers/financial/financialController");
 

const router = express.Router();

router.get("/", checkIsAdmin, checkIsSubscribed, getFinance);

module.exports = router;
