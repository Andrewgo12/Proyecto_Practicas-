// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Método para actualizar el estado del pedido
orderSchema.methods.updateOrderStatus = function(status) {
    this.orderStatus = status;
    return this.save();
};

// Método para actualizar el estado de pago
orderSchema.methods.updatePaymentStatus = function(status) {
    this.paymentStatus = status;
    return this.save();
};

// Crear y exportar el modelo
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
