// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Método para reducir el stock de un producto cuando se realiza una compra
productSchema.methods.reduceStock = function(quantity) {
    if (this.stock >= quantity) {
        this.stock -= quantity;
        return this.save();
    } else {
        throw new Error('No hay suficiente stock disponible.');
    }
};

// Crear y exportar el modelo
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
