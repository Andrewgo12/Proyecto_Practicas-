const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Payment = require('./models/Payment');
const Session = require('./models/Session');

dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos MongoDB exitosa');
        createCollections();
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error);
        process.exit(1);
    });

// Función para crear las colecciones y poblarlas con datos iniciales
const createCollections = async () => {
    try {
        console.log('Creando colecciones y agregando datos iniciales...');

        // Eliminar colecciones existentes si las hay
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Payment.deleteMany();
        await Session.deleteMany();

        console.log('Colecciones eliminadas (si existían)...');

        // Insertar datos iniciales para usuarios
        const users = [
            new User({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedpassword123', // Deberías usar un hash real aquí
                role: 'admin',
            }),
            new User({
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'hashedpassword123', // Deberías usar un hash real aquí
                role: 'user',
            }),
        ];

        // Insertar datos iniciales para productos
        const products = [
            new Product({
                name: 'Laptop XYZ',
                description: 'Una laptop potente para desarrolladores',
                price: 1200,
                stock: 50,
            }),
            new Product({
                name: 'Smartphone ABC',
                description: 'El último modelo de smartphone',
                price: 800,
                stock: 100,
            }),
        ];

        // Insertar datos iniciales para órdenes
        const orders = [
            new Order({
                userId: users[0]._id,
                products: [
                    { productId: products[0]._id, quantity: 1 },
                    { productId: products[1]._id, quantity: 2 },
                ],
                totalPrice: 2800,
                status: 'completed',
            }),
            new Order({
                userId: users[1]._id,
                products: [{ productId: products[1]._id, quantity: 1 }],
                totalPrice: 800,
                status: 'pending',
            }),
        ];

        // Insertar datos iniciales para pagos
        const payments = [
            new Payment({
                orderId: orders[0]._id,
                amount: 2800,
                method: 'credit_card',
                status: 'completed',
            }),
            new Payment({
                orderId: orders[1]._id,
                amount: 800,
                method: 'paypal',
                status: 'pending',
            }),
        ];

        // Insertar datos iniciales para sesiones
        const sessions = [
            new Session({
                userId: users[0]._id,
                token: 'randomauthtoken12345',
                expiration: new Date(Date.now() + 3600000), // Expira en 1 hora
            }),
            new Session({
                userId: users[1]._id,
                token: 'randomauthtoken67890',
                expiration: new Date(Date.now() + 3600000), // Expira en 1 hora
            }),
        ];

        // Insertar todos los datos
        await Promise.all([
            User.insertMany(users),
            Product.insertMany(products),
            Order.insertMany(orders),
            Payment.insertMany(payments),
            Session.insertMany(sessions),
        ]);

        console.log('Colecciones y datos iniciales agregados exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear colecciones y poblar datos:', error);
        process.exit(1);
    }
};
