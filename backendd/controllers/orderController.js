// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Crear nueva orden
exports.createOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        // Obtener carrito de compras
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: 'El carrito está vacío' });
        }

        // Calcular el total de la orden
        let total = 0;
        cart.items.forEach(item => {
            total += item.productId.price * item.quantity;
        });

        // Crear la orden
        const order = new Order({
            userId,
            items: cart.items,
            totalPrice: total,
            status: 'Pendiente',
            timestamp: new Date(),
        });

        await order.save();

        // Vaciar el carrito
        await Cart.findOneAndDelete({ userId });

        res.status(201).json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener las órdenes de un usuario
exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar el estado de la orden
exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
