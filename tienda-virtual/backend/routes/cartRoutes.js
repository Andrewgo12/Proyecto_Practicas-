// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/authMiddleware');

// Agregar producto al carrito
router.post('/add', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: 'El producto y la cantidad son requeridos' });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user._id });
        
        if (!cart) {
            cart = new Cart({ userId: req.user._id, products: [] });
        }
        
        await cart.addProduct(productId, quantity);
        await cart.updateTotalAmount();
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
});

// Obtener el carrito de un usuario
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
});

// Eliminar producto del carrito
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        await cart.updateTotalAmount();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
});

module.exports = router;

