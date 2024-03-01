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
                res.status(500).send(new ResponseFormat(500, "FAILURE", { err: err.message }, "Erreur serveur"))
            }
        }
        else {
            res.status(401).send(new ResponseFormat(401, "FAILURE", { err: err.message }, "Veuillez remplir tous les champs"))
        }
    }
    async modifyProduct(req, res) {
        let { productName, newName, newLocation, newCategory, newDescription, newQuantity } = req.body
        if (productName && newName) {
            try {
                productName = productName.toLowerCase()
                newName = newName.toLowerCase()
                newCategory = newCategory.toLowerCase()
                const data = await productService.modifyProduct(productName, newName, newLocation, newCategory, newDescription, newQuantity)
                if (data) {
                    res.status(200).send(new ResponseFormat(200, "SUCCESS", {}, "product successfully updated"));
                } else {
                    res.status(403).send(new ResponseFormat(403, "FAILURE", {}, "Erreur lors de la modification"))
                }
            } catch (err) {
                res.status(500).send(new ResponseFormat(500, "FAILURE", { err: err.message }, "Erreur serveur"))
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
                res.send(new ResponseFormat(500, "FAILURE", { err: err.message }, "Erreur serveur"))
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
                    res.status(200).send(new ResponseFormat(200, "SUCCESS", { product }, "Produit trouvé"))
                }
            } catch (e) {
                res.status(500).send(new ResponseFormat(500, "FAILURE", { err: e.message }, "Erreur serveur"))
            }
        } else {
            res.status(404).send(new ResponseFormat(401, "FAILURE", {}, `ce produit n'existe pas`))
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