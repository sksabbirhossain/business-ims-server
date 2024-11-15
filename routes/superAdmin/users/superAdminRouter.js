const express = require("express");
const {
  createSuperAdmin,
  loginSuperAdmin,
} = require("../../../controller/superAdmin/users/superAdminController");

const router = express.Router();

// create superAdmin
router.post("/create-superadmin", createSuperAdmin);
router.post("/login", loginSuperAdmin);

module.exports = router;
