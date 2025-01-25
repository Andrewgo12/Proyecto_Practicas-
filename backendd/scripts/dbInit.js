// scripts/dbInit.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const dbInit = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/mi_tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexión exitosa a la base de datos');

        // Crear productos predeterminados
        const productos = await Product.find();
        if (productos.length === 0) {
            await Product.create([
                { nombre: 'Camiseta', descripcion: 'Camiseta de algodón', precio: 20.99, categoria: 'Ropa' },
                { nombre: 'Zapatos', descripcion: 'Zapatos deportivos', precio: 50.00, categoria: 'Calzado' },
            ]);
            console.log('Productos predeterminados insertados');
        }

        // Crear usuarios predeterminados
        const usuarios = await User.find();
        if (usuarios.length === 0) {
            await User.create([
                { nombre: 'Juan', email: 'juan@correo.com', password: '123456', rol: 'admin' },
                { nombre: 'Maria', email: 'maria@correo.com', password: '123456', rol: 'usuario' },
            ]);
            console.log('Usuarios predeterminados insertados');
        }

        // Crear órdenes predeterminadas
        const ordenes = await Order.find();
        if (ordenes.length === 0) {
            await Order.create([
                { userId: '1', productos: [{ productId: '1', cantidad: 2 }], total: 100.00 },
            ]);
            console.log('Órdenes predeterminadas insertadas');
        }

        console.log('Base de datos inicializada correctamente');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error al inicializar la base de datos', error);
    }
};

dbInit();
