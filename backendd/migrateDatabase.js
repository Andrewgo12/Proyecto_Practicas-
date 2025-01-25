const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Payment = require('./models/Payment');

dotenv.config();

const migrateData = async () => {
    try {
        console.log('Iniciando migración de base de datos...');

        // Conexión a MongoDB
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Eliminar los datos existentes
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Payment.deleteMany();

        console.log('Datos antiguos eliminados exitosamente.');

        const users = [];
        const products = [];
        const orders = [];
        const payments = [];

        // Crear 100 usuarios con nombres y correos electrónicos generados
        for (let i = 1; i <= 100; i++) {
            const name = `User${i}`;
            const email = `user${i}@example.com`;
            const password = `password${i}`;
            users.push(new User({ name, email, password }));
        }

        // Crear 100 productos con nombres, descripciones y precios diferentes
        for (let i = 1; i <= 100; i++) {
            const name = `Product ${i}`;
            const price = Math.floor(Math.random() * 900) + 100; // Precio aleatorio entre 100 y 999
            const description = `Description for ${name}`;
            products.push(new Product({ name, price, description }));
        }

        // Crear 30 órdenes con diferentes usuarios y productos
        for (let i = 1; i <= 30; i++) {
            const userId = `user${i}`;
            const productId = `product${i}`;
            const quantity = Math.floor(Math.random() * 10) + 1; // Cantidad entre 1 y 10
            const totalPrice = products[i % 100].price * quantity;
            orders.push(new Order({ userId, productId, quantity, totalPrice }));
        }

        // Crear 10 pagos con diferentes métodos de pago
        for (let i = 1; i <= 10; i++) {
            const orderId = `order${i}`;
            const amount = orders[i % 30].totalPrice;
            const status = 'Completed';
            payments.push(new Payment({ orderId, amount, status }));
        }

        await Promise.all([
            User.insertMany(users),
            Product.insertMany(products),
            Order.insertMany(orders),
            Payment.insertMany(payments),
        ]);

        console.log('Migración completada con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('Error durante la migración:', error);
        process.exit(1);
    }
};

migrateData();
