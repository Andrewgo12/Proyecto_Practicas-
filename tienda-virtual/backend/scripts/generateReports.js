// scripts/generateReports.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');
const fs = require('fs');

const generateReports = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/mi_tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Generar informe de productos
        const productos = await Product.find();
        const productReport = productos.map(producto => {
            return `${producto.nombre},${producto.precio},${producto.categoria}`;
        }).join('\n');

        fs.writeFileSync('reportes/productos.csv', 'Nombre,Precio,Categoría\n' + productReport);
        console.log('Informe de productos generado con éxito');

        // Generar informe de órdenes
        const ordenes = await Order.find();
        const orderReport = ordenes.map(orden => {
            return `${orden.userId},${orden.total},${orden.fecha}`;
        }).join('\n');

        fs.writeFileSync('reportes/ordenes.csv', 'Usuario,Total,Fecha\n' + orderReport);
        console.log('Informe de órdenes generado con éxito');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error al generar los informes', error);
    }
};

generateReports();
