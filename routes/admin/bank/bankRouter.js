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

const router = express.Router();

//get banks with pagination
router.get("/bank-list", checkIsAdmin, getBanks);

//get all bank
router.get("/all", checkIsAdmin, getAllBanks);

// get a bank by bankId
router.get("/bank/:bankId", checkIsAdmin, getbank);

//update a bank by bankId
router.patch(
  "/update-bank/:bankId",
  checkIsAdmin,
  bankValidators,
  bankValidationHandler,
  updateBank
);

//create bank
router.post(
  "/create",
  checkIsAdmin,
  bankValidators,
  bankValidationHandler,
  createBank
);

// delete a bank by bankId
router.delete("/delete-bank/:bankId", checkIsAdmin, deleteBank);

module.exports = router;
