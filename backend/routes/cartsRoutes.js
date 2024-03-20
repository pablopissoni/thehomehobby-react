const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartsController");

router.post("/carrito", (req, res, next) => {
  try {
    cartController.addToCart(req, res, req.dbConnection);
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

router.get("/carrito/:userId", (req, res, next) => {
  try {
    cartController.getCartByUserId(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.put("/carrito/:userId", (req, res, next) => {
  try {
    cartController.editCartItem(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
