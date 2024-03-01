const productsModel = require("../models/product.model.js")
const ResponseFormat = require("../utils/response.js")
class ProductsService {
    async addProduct(name, location, quantity, category, description) {
        const existProduct = await productsModel.findOne({ name: name })
        if (!existProduct) {
            const newProduct = await new productsModel({
                name: name,
                location: location,
                quantity: quantity,
                category: category,
                description: description
            })
            await newProduct.save()
            return ResponseFormat(200, 'SUCCESS', { newProduct }, "Product successfully added!")
        }
        return ResponseFormat(403, 'ERROR', { error: "Product already exist!" }, "Product already exist!")
    }
    async modifyProduct(productName, newName, newLocation, newCategory, newDescription, newQuantity) {
        try {
            const existProduct = await productsModel.findOneAndUpdate(
                { name: productName },
                {
                    $set: {
                        name: newName,
                        location: newLocation,
                        quantity: newQuantity,
                        category: newCategory,
                        description: newDescription
                    }
                },
                { new: true }
            )
            if (existProduct) {
                return ResponseFormat(200, 'SUCCESS', { existProduct }, "Product successfully modified!")
            }
            return ResponseFormat(404, 'FAILURE', { error: "Product not found!" }, "Product not found!")
        } catch (error) {
            return ResponseFormat(500, 'ERROR', { error: error.message }, "Erreur")
        }
    }
    async deleteProduct(productName) {
        try {
            const productToDelete = await productsModel.findOneAndDelete({ name: productName })
            if (!productToDelete) {
                return ResponseFormat(404, 'FAILURE', { error: "Product not found!" }, "Product not found!")
            }
            return ResponseFormat(200, 'SUCCESS', { productToDelete }, "Product successfully deleted!")
        } catch (error) {
            return ResponseFormat(500, 'FAILURE', { error: error.message }, "Product not found!")
        }
    }
    async getOneProduct(productName) {
        const product = await productsModel.findOne({ name: productName })
        if (product) {
            return ResponseFormat(200, 'SUCCESS', { product }, "Produits réccupérés");
        } else
            return product
    }
    async getAllProducts() {
        const products = await productsModel.find()
        console.log(products)
        return products
    }
}
module.exports = ProductsService