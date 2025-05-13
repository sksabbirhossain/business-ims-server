const express = require("express");
const checkIsAdmin = require("../../../middleware/common/admin/checkIsAdmin");
const {
  createBank,
  getBanks,
  getbank,
  updateBank,
  deleteBank,
  getAllBanks,
} = require("../../../controller/admin/bank/bankController");
const {
  bankValidators,
  bankValidationHandler,
} = require("../../../validators/admin/bank/bankValidators");
const checkIsSubscribed = require("../../../middleware/common/admin/checkIsSubscribed");

const router = express.Router();

//get banks with pagination
router.get("/bank-list", checkIsAdmin, checkIsSubscribed, getBanks);

//get all bank
router.get("/all", checkIsAdmin, checkIsSubscribed, getAllBanks);

// get a bank by bankId
router.get("/:bankId", checkIsAdmin, checkIsSubscribed, getbank);

//update a bank by bankId
router.patch(
  "/update-bank/:bankId",
  checkIsAdmin,
  checkIsSubscribed,
  bankValidators,
  bankValidationHandler,
  updateBank
);

//create bank
router.post(
  "/create",
  checkIsAdmin,
  checkIsSubscribed,
  bankValidators,
  bankValidationHandler,
  createBank
);

// delete a bank by bankId
router.delete(
  "/delete-bank/:bankId",
  checkIsAdmin,
  checkIsSubscribed,
  deleteBank
);

module.exports = router;
