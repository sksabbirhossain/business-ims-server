const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createReturnSale,
} = require("../../../controller/admin/returnSale/returnSale");

const router = express.Router();

//create return sale
router.post("/", checkIsAdmin, createReturnSale);

module.exports = router;
