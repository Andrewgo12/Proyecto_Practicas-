// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/authMiddleware');

// Crear una nueva orden
router.post('/', authMiddleware, async (req, res) => {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
        return res.status(400).json({ message: 'La dirección de envío es requerida' });
    }

    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        const newOrder = new Order({
            userId: req.user._id,
            cartId: cart._id,
            shippingAddress,
            totalAmount: cart.totalAmount
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error });
    }
});

// Actualizar estado de la orden
router.put('/:orderId/status', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'El estado es requerido' });
    }

    try {
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        order.orderStatus = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la orden', error });
    }
});

module.exports = router;

