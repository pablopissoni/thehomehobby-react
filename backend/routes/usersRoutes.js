// usersRoute.js
const express = require("express");
const router = express.Router();
const {
  getToken,
  registerUser,
  loginUser,
  confirmAccount,
  resendConfirmationEmail,
  recoverAccount,
  resetPassword,
} = require("../controllers/usersControllers");

// Rutas relacionadas con la gestión de usuarios
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/confirm", confirmAccount);
router.post("/resend_confirmation_email", resendConfirmationEmail);
router.post("/recover", recoverAccount);
router.post("/reset-password", resetPassword);

// TEST
router.post("/get-token", getToken);

module.exports = router;
