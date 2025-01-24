// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Método para agregar un producto al carrito
cartSchema.methods.addProduct = function(productId, quantity) {
    const existingProductIndex = this.products.findIndex(item => item.productId.toString() === productId.toString());
    
    if (existingProductIndex !== -1) {
        this.products[existingProductIndex].quantity += quantity;
    } else {
        this.products.push({ productId, quantity });
    }

    this.updatedAt = Date.now();
    return this.save();
};

// Método para actualizar el total del carrito
cartSchema.methods.updateTotalAmount = function() {
    let total = 0;
    this.products.forEach(item => {
        total += item.quantity * item.productId.price; // Asumiendo que los productos tienen un campo "price"
    });

    this.totalAmount = total;
    return this.save();
};

// Crear y exportar el modelo
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
