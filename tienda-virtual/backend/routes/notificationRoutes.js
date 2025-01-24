// routes/notificationProduct.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/authMiddleware');

// Notificar cuando un producto esté bajo de stock
router.post('/notify', authMiddleware, async (req, res) => {
    const { productId, threshold } = req.body;

    if (!productId || !threshold) {
        return res.status(400).json({ message: 'El producto y el umbral de stock son requeridos' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (product.stock <= threshold) {
            // Lógica de notificación (por ejemplo, enviar un correo electrónico o mensaje)
            res.status(200).json({ message: 'El producto está bajo de stock. Notificación enviada.' });
        } else {
            res.status(200).json({ message: 'El stock del producto es suficiente.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la notificación', error });
    }
});

module.exports = router;
