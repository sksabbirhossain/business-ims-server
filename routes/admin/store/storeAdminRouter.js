const express = require("express");
const {
  logInStore,
} = require("../../../controller/admin/store/storeAdminController");

const router = express.Router();

router.post("/login", logInStore);

module.exports = router;
