// app.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');
const path = require('path');

dotenv.config();

const app = express();

// Configuración de middlewares
app.use(helmet()); // Seguridad básica
app.use(morgan('dev')); // Logging de solicitudes
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear cuerpos JSON
app.use(express.urlencoded({ extended: true })); // Parsear cuerpos URL encoded

// Configuración de rutas
app.use('/api', routes); // Cargar rutas desde el archivo de rutas

// Limitar solicitudes
app.use(rateLimitMiddleware);

// Middleware de manejo de errores
app.use(errorHandlingMiddleware);

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos MongoDB');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    });

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Servidor de API en funcionamiento');
});

// Escuchar en el puerto configurado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

