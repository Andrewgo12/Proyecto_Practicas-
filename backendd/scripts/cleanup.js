// scripts/cleanup.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');

const cleanup = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect('mongodb://localhost:27017/mi_tienda', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Eliminar productos con precios nulos o negativos
    await Product.deleteMany({ precio: { $lte: 0 } });
    console.log('Productos eliminados con precios nulos o negativos');

    // Eliminar órdenes de más de 1 año
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    await Order.deleteMany({ fecha: { $lt: oneYearAgo } });
    console.log('Órdenes antiguas eliminadas');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error durante la limpieza de la base de datos', error);
  }
};

cleanup();
