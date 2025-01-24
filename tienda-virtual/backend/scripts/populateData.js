// scripts/populateData.js
const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('../models/Product');

const populateData = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/mi_tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Leer datos del archivo JSON
        const data = JSON.parse(fs.readFileSync('productos.json', 'utf8'));

        // Insertar productos en la base de datos
        await Product.insertMany(data);
        console.log('Datos de productos insertados correctamente');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error al poblar los datos', error);
    }
};

populateData();
