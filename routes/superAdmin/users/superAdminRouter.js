const express = require("express");
const {
  createSuperAdmin,
  loginSuperAdmin,
  checkUser,
} = require("../../../controller/superAdmin/users/superAdminController");
const {
  superAdminValidators,
  superAdminValidationHandler,
} = require("../../../validators/superAdmin/users/superAdminValidators");
const {
  superAdminLoginValidationHandler,
  superAdminLoginValidators,
} = require("./superAdminLoginValidators");

const router = express.Router();

// create superAdmin
router.post(
  "/create-superadmin",
  superAdminValidators,
  superAdminValidationHandler,
  createSuperAdmin
);
router.post(
  "/login",
  superAdminLoginValidators,
  superAdminLoginValidationHandler,
  loginSuperAdmin
);

//refresh token
router.post("/me", checkUser);

module.exports = router;
