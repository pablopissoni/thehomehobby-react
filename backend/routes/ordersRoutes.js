const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Ruta para crear un nuevo pedido
router.post("/:userId", ordersController.createOrder);

module.exports = router;
