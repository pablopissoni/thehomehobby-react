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

router.get("/prodbysubcategory", (req, res, next) => {
  try {
    productsController.getProdBySubCategoryPage(req, res, req.dbConnection);
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

router.get("/prodbymarca", (req, res, next) => {
  try {
    productsController.getProductByBrand(req, res, req.dbConnection);
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

router.get("/categories", (req, res, next) => {
  try {
    productsController.getAllCategories(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/subcategories", (req, res, next) => {
  try {
    productsController.getAllSubCategories(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/subcategories/:id", (req, res, next) => {
  try {
    productsController.getProdBySubCategory(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/marcas", (req, res, next) => {
  try {
    productsController.getAllMarcas(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/categoriesbysearchproduct", (req, res, next) => {
  try {
    productsController.getCategAvailableFilters(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.get("/ofertas", (req, res, next) => {
  try {
    productsController.getAllOfertas(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

router.put("/productos/:id", (req, res, next) => {
  //! getAllMarcas ?
  try {
    productsController.updateProduct(req, res, req.dbConnection);
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

router.get("/categories", (req, res, next) => {
  try {
    categoriesController.getAllCategories(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/categories/:id", (req, res, next) => {
  try {
    productsController.getCategoryWithSubcategories(req, res, req.dbConnection);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
