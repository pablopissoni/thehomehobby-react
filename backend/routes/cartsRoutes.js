const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartsController");

router.post("/carrito", (req, res, next) => {
  try {
    productsController.addToCart(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.delete("/carrito/:id", (req, res, next) => {
  try {
    cartController.removeFromCart(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

module.exports = router