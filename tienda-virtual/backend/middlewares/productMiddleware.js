// middlewares/productMiddleware.js
const Product = require('../models/Product'); // El modelo de producto

async function verifyProduct(req, res, next) {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado.' });
        }

        // Almacenamos el producto en la solicitud para usarlo en los siguientes middlewares o rutas
        req.product = product;

        // Podemos registrar más información de la verificación si es necesario
        console.log(`Producto verificado: ${product.name} (${productId})`);

        next();  // Continuar con la siguiente operación
    } catch (error) {
        console.error('Error al verificar el producto:', error);
        return res.status(500).json({ msg: 'Error al verificar el producto.', error: error.message });
    }
}

module.exports = verifyProduct;
