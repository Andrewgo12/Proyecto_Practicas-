// middlewares/errorHandling.js

function errorHandling(err, req, res, next) {
    console.error('Error en la aplicación:', err.stack);

    // Dependiendo del entorno, podemos mostrar más información
    if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({ msg: 'Algo salió mal', error: err.message, stack: err.stack });
    }

    res.status(500).json({ msg: 'Algo salió mal, por favor intente nuevamente.' });
}

// Middleware para manejar errores 404 (no encontrado)
function notFoundHandler(req, res, next) {
    res.status(404).json({ msg: 'Recurso no encontrado' });
}

module.exports = { errorHandling, notFoundHandler };
