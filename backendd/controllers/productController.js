// controllers/productController.js
const Product = require('../models/Product');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
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
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        let product = await Product.findById(id);
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
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        let product = await Product.findById(id);
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
