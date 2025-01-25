// services/purchase.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const createOrder = async (userId, productList) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const products = await Product.find({ '_id': { $in: productList } });
    if (products.length === 0) throw new Error('Productos no encontrados');

    const total = products.reduce((sum, product) => sum + product.precio, 0);
    const newOrder = new Order({
        userId,
        productos: products,
        total,
    });

    await newOrder.save();
    return newOrder;
};

module.exports = { createOrder };

