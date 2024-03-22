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
  editRole,
  getUsers,
  editUser,
} = require("../controllers/usersControllers");

// Rutas relacionadas con la gestión de usuarios
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resend_confirmation_email", resendConfirmationEmail);
router.post("/recover", recoverAccount);
router.post("/reset-password", resetPassword);
router.get("/users", getAllUsers);
router.get("/getusers", getUsers);
router.delete("/users/:userId", deleteUser);
router.put("/:userId", editRole);
router.put("/users/:userId", editUser);
router.post("/get-token", getToken);

module.exports = router;
