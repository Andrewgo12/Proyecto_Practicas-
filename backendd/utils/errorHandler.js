// Maneja los errores en la aplicación
function handleError(error) {
    const errorMessage = {
        message: error.message || 'Error desconocido',
        stack: error.stack || 'No stack disponible'
    };

    // Puedes agregar aquí más detalles según el tipo de error
    console.error(errorMessage);
    return errorMessage;
}

// Función para manejar errores HTTP específicos
function handleHttpError(res, statusCode, message) {
    res.status(statusCode).json({ error: message });
}

// Función para manejar errores de validación de datos
function handleValidationError(res, errors) {
    res.status(400).json({ errors });
}

// Función para manejar errores de autenticación
function handleAuthError(res) {
    res.status(401).json({ message: 'No autorizado' });
}

module.exports = {
    handleError,
    handleHttpError,
    handleValidationError,
    handleAuthError
};
