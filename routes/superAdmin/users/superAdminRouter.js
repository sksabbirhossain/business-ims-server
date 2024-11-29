const express = require("express");

// import controllers
const {
  createSuperAdmin,
  loginSuperAdmin,
  checkUser,
} = require("../../../controller/superAdmin/users/superAdminController");

// import validators
const {
  superAdminValidators,
  superAdminValidationHandler,
} = require("../../../validators/superAdmin/users/superAdminValidators");
const {
  superAdminLoginValidationHandler,
  superAdminLoginValidators,
} = require("../../../validators/superAdmin/users/superAdminLoginValidators");

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
