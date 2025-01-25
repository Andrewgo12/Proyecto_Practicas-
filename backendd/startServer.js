// startServer.js
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');  // Importar app.js

dotenv.config();

// Inicializar la conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión con la base de datos establecida');
        // Arrancar el servidor una vez se haya conectado a la base de datos
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos', err);
        process.exit(1);  // Detener el proceso si no se puede conectar
    });

