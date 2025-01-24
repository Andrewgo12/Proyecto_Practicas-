// scripts/updatePrices.js
const mongoose = require('mongoose');
const Product = require('../models/Product');

const updatePrices = async (increasePercentage) => {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/mi_tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Actualizar los precios de los productos
        await Product.updateMany({}, { $mul: { precio: 1 + increasePercentage / 100 } });
        console.log(`Precios actualizados con un incremento del ${increasePercentage}%`);

        mongoose.disconnect();
    } catch (error) {
        console.error('Error al actualizar los precios', error);
    }
};

updatePrices(10); // Aumento del 10%
