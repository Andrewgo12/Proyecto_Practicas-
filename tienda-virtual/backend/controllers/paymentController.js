// controllers/paymentController.js
const Order = require('../models/Order');
const User = require('../models/User');

// Procesar el pago de una orden
exports.processPayment = async (req, res) => {
    const { orderId, paymentMethod } = req.body;

    try {
        // Verificar si la orden existe
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        // Verificar si el pago ya fue realizado
        if (order.status === 'paid') {
            return res.status(400).json({ msg: 'La orden ya fue pagada' });
        }

        // Procesar el pago (simulación de pago)
        // Aquí puedes integrar con un servicio real de pagos como Stripe o PayPal
        order.status = 'paid';
        order.paymentMethod = paymentMethod;
        order.paymentDate = new Date();

        // Actualizar el stock de los productos comprados
        for (const item of order.items) {
            // Aquí puedes actualizar la base de datos de productos si es necesario
            // Ejemplo: reducir el stock de los productos
        }

        await order.save();
        res.status(200).json({ msg: 'Pago procesado con éxito', order });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener el estado de un pago
exports.getPaymentStatus = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        res.json({ paymentStatus: order.status });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
