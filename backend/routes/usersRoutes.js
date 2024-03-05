// usersRoute.js
const express = require("express");
const router = express.Router();
const {
  getToken,
  registerUser,
  loginUser,
  resendConfirmationEmail,
  recoverAccount,
  resetPassword,
  getAllUsers,
  deleteUser,
  editUser,
} = require("../controllers/usersControllers");

// Rutas relacionadas con la gestión de usuarios
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resend_confirmation_email", resendConfirmationEmail);
router.post("/recover", recoverAccount);
router.post("/reset-password", resetPassword);
router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);
router.put("/:userId", editUser);
router.post("/get-token", getToken);

module.exports = router;
