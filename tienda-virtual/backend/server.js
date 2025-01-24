// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

// Configuración de middlewares
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));

// Definir rutas principales
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Configurar el puerto y escuchar
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});
