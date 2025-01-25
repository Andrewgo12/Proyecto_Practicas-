// routes/payment.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/authMiddleware');

// Crear un pago para una orden
router.post('/', authMiddleware, async (req, res) => {
    const { orderId, paymentMethod, paymentAmount } = req.body;

    if (!orderId || !paymentMethod || !paymentAmount) {
        return res.status(400).json({ message: 'Faltan datos para procesar el pago' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        const payment = new Payment({
            orderId,
            paymentMethod,
            paymentAmount,
            paymentStatus: 'pending'
        });

        await payment.save();
        order.paymentStatus = 'pending';
        await order.save();
        
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el pago', error });
    }
});

// Actualizar estado del pago
router.put('/:paymentId/status', authMiddleware, async (req, res) => {
    const { paymentId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'El estado del pago es requerido' });
    }

    try {
        const payment = await Payment.findById(paymentId);
        
        if (!payment) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        payment.paymentStatus = status;
        await payment.save();
        
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del pago', error });
    }
});

module.exports = router;

