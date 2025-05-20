const express = require("express");
const { createStoreValidators, createStoreValidationHandler } = require("../../validators/stores/createStoreValidators");
const { createStore } = require("../../controllers/stores/storeController");
 

const router = express.Router();

//create store route
router.post(
  "/create-store",
  createStoreValidators,
  createStoreValidationHandler,
  createStore
);

module.exports = router;
