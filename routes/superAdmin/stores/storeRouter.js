const express = require("express");
const {
  createStore,
} = require("../../../controller/superAdmin/stores/storeController");
const {
  createStoreValidators,
  createStoreValidationHandler,
} = require("../../../validators/superAdmin/stores/createStoreValidators");

const router = express.Router();

//create store route
router.post(
  "/create-store",
  createStoreValidators,
  createStoreValidationHandler,
  createStore
);

module.exports = router;
