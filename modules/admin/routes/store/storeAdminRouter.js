const express = require("express");
const { storeLoginValidators, storeLoginValidationHandler } = require("../../validators/storeLogin/storeLoginValidators");
const { logInStore } = require("../../controllers/store/storeAdminController");
 

const router = express.Router();

//login as a store admin route
router.post(
  "/login",
  storeLoginValidators,
  storeLoginValidationHandler,
  logInStore
);

module.exports = router;
