const express = require("express");
const {
  createSuperAdmin,
  loginSuperAdmin,
} = require("../../../controller/superAdmin/users/superAdminController");
const {
  superAdminValidators,
  superAdminValidationHandler,
} = require("../../../validators/superAdmin/users/superAdminValidators");

const router = express.Router();

// create superAdmin
router.post(
  "/create-superadmin",
  superAdminValidators,
  superAdminValidationHandler,
  createSuperAdmin
);
router.post("/login", loginSuperAdmin);

module.exports = router;
