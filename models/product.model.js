const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductModel = mongoose.model("Product", new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false
    }
}))

module.exports = ProductModel;
