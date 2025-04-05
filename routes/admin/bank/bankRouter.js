const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const { createBank } = require("../../../controller/admin/bank/bankController");

const router = express.Router();

//create bank
router.post("/create", checkIsAdmin, createBank)

module.exports = router;
