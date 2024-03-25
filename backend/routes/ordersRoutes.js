const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Ruta para crear un nuevo pedido
router.post("/:userId", ordersController.createOrder);
// Ruta para obtener todos los pedidos
router.get("/", ordersController.getAllOrders);
// Ruta para eliminar un pedido por su ID
router.delete("/:orderId", ordersController.deleteOrder);

module.exports = router;
