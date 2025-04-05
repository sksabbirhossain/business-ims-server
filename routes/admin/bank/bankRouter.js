const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const { createBank } = require("../../../controller/admin/bank/bankController");
const {
  bankValidators,
  bankValidationHandler,
} = require("../../../validators/admin/bank/bankValidators");

const router = express.Router();

//get all bank
router.get("/bank-list", checkIsAdmin, getBanks);

//create bank
router.post(
  "/create",
  checkIsAdmin,
  bankValidators,
  bankValidationHandler,
  createBank
);

module.exports = router;
