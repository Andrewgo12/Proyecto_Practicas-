
const Order = require('../models/Order');

const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ userId });
    if (orders.length === 0) throw new Error('No se encontraron órdenes');

    return orders;
};

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Orden no encontrada');

    return order;
};

module.exports = { getOrdersByUserId, getOrderById };
