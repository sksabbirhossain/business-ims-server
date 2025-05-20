const express = require("express");
const { superAdminValidators, superAdminValidationHandler } = require("../../validators/users/superAdminValidators");
const { createSuperAdmin, loginSuperAdmin } = require("../../controllers/users/superAdminController");
const { superAdminLoginValidators, superAdminLoginValidationHandler } = require("../../validators/users/superAdminLoginValidators");

 

const router = express.Router();

// create superAdmin
router.post(
  "/create-superadmin",
  superAdminValidators,
  superAdminValidationHandler,
  createSuperAdmin
);

//login superAdmin
router.post(
  "/login",
  superAdminLoginValidators,
  superAdminLoginValidationHandler,
  loginSuperAdmin
);

module.exports = router;
