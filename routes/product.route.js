const express = require('express');
const router = express.Router();
const ProductController = require("../controller/product.controller.js")
const productController = new ProductController()
router.post("/addProduct", (req, res) => productController.addProduct(req, res))
router.put("/modifyProduct/:productName", (req, res) => productController.modifyProduct(req, res))
router.delete("/deleteProduct/:productName", (req, res) => productController.deleteProduct(req, res))
router.get("/getOneProduct/:productName", (req, res) => productController.getOneProduct(req, res))
router.get("/getAllProducts", (req, res) => productController.getAllProducts(req, res))

module.exports = router