// services/manageProduct.js
const Product = require('../models/Product');

const createProduct = async (productData) => {
    const { nombre, descripcion, precio, categoria } = productData;
    const newProduct = new Product({ nombre, descripcion, precio, categoria });

    await newProduct.save();
    return newProduct;
};

const updateProduct = async (productId, updatedData) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    if (!updatedProduct) throw new Error('Producto no encontrado');

    return updatedProduct;
};

const deleteProduct = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error('Producto no encontrado');

    return deletedProduct;
};

module.exports = { createProduct, updateProduct, deleteProduct };

