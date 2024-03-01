const ProductService = require("../services/product.service.js");
const ResponseFormat = require("../utils/response.js")
const productService = new ProductService()
class ProductController {
    async addProduct(req, res) {
        let { name, location, quantity, category, description } = req.body
        if (name && location && quantity && category) {
            try {
                name = name.toLowerCase()
                category = category.toLowerCase()
                const data = await productService.addProduct(name, location, quantity, category, description)
                res.status(data.code).send(data)
            } catch (err) {
                res.status(500).json({ error: err })
            }
        }
        else {
            res.status(401).json({ error: "Veuillez remplir tous les champs" })
        }
    }
    async modifyProduct(req, res) {
        let { productName, newName, newLocation, newCategory, newDescription, newQuantity } = req.body
        if (productName && newName) {
            try {
                productName = productName.toLowerCase()
                newName = newName.toLowerCase()
                newCategory = newCategory.toLowerCase()
                newQuantity = newQuantity.toLowerCase()
                const data = await productService.modifyProduct(productName, newName, newLocation, newCategory, newDescription, newQuantity)
                res.status(data.code).send(data)
            } catch (err) {
                res.status(500).json({ error: err })
            }
        }
    }
    async deleteProduct(req, res) {
        let { productName } = req.body
        if (productName) {
            try {
                productName = productName.toLowerCase()
                const data = await productService.deleteProduct(productName)
                res.status(data.code).send(data)
            } catch (err) {
                res.status(500).json({ error: err })
            }
        }
    }
    async getOneProduct(req, res) {
        let { productName } = req.body
        productName = productName.toLowerCase()
        if (productName) {
            try {
                const product = await productService.getOneProduct(productName)
                if (product) {
                    res.send(product)
                }
            } catch (e) {
                res.status(500).json({ e: e.message })
            }
        } else {
            res.status(401).json({ error: "Veuillez remplir les champs" })
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts()
            if (products) {
                res.send(products)
            }
        } catch (e) {
            res.status(500).json({ e: e.message })
        }
    }
}
module.exports = ProductController