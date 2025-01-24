// routes/manageProduct.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { adminMiddleware } = require('../middleware/authMiddleware');

// Agregar nuevo producto
router.post('/add', adminMiddleware, async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const newProduct = new Product({ name, description, price, stock, category, imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
});

// Editar producto existente
router.put('/edit/:id', adminMiddleware, async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock, category, imageUrl },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el producto', error });
    }
});

// Eliminar producto
router.delete('/delete/:id', adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});

module.exports = router;

