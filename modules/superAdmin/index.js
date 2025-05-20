// superAdmin/index.js
const express = require("express");
const router = express.Router();

router.use("/users", require("./routes/users/superAdminRouter"));
router.use("/stores", require("./routes/stores/storeRouter"));

module.exports = router;
