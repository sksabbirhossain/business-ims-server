const express = require("express");
const {
  logInStore,
} = require("../../../controller/admin/store/storeAdminController");
const {
  storeLoginValidators,
  storeLoginValidationHandler,
} = require("../../../validators/admin/storeLogin/storeLoginValidators");

const router = express.Router();

//login as a store admin route
router.post(
  "/login",
  storeLoginValidators,
  storeLoginValidationHandler,
  logInStore
);

module.exports = router;
