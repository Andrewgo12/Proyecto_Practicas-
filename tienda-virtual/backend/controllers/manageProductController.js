// controllers/manageController.js
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Obtener estadísticas generales de la tienda
exports.getStoreStatistics = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments({ status: 'paid' });
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]);

        res.json({
            totalProducts,
            totalUsers,
            totalOrders,
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Ver todos los productos en la tienda
exports.getAllProductsForAdmin = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Ver todos los usuarios
exports.getAllUsersForAdmin = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Ver todas las órdenes
exports.getAllOrdersForAdmin = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Subir un nuevo producto (solo para administradores)
exports.addProductForAdmin = async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ msg: 'Producto añadido con éxito', product: newProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar un producto (solo para administradores)
exports.updateProductForAdmin = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.imageUrl = imageUrl || product.imageUrl;

        await product.save();
        res.json({ msg: 'Producto actualizado con éxito', product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Eliminar un producto (solo para administradores)
exports.deleteProductForAdmin = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        await product.remove();
        res.json({ msg: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
