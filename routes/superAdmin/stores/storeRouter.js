const express = require("express");
const {
  createStore,
} = require("../../../controller/superAdmin/stores/storeController");

const router = express.Router();

//create store route
router.post("/create-store", createStore);

module.exports = router;
