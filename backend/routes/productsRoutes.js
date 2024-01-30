const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsControllers");

router.get("/productos", (req, res, next) => {
  try {
    productsController.getAllProducts(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/productos/:id", (req, res, next) => {
  try {
    productsController.getProductById(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.post("/productos", (req, res, next) => {
  try {
    productsController.createProduct(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.delete("/productos/:id", (req, res, next) => {
  try {
    productsController.deleteProduct(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.put("/productos/:id", (req, res, next) => {
  try {
    productsController.updateProduct(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
