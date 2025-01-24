// middlewares/actionMiddleware.js

const fs = require('fs'); // Para escribir en archivos de registro
const path = require('path');

// Función para registrar las acciones en un archivo
function logAction(action, resource, userId) {
    const logMessage = `[${new Date().toISOString()}] Acción: ${action} en el recurso: ${resource} por el usuario ID: ${userId}\n`;
    
    // Guardar el log en un archivo
    fs.appendFile(path.join(__dirname, '../logs/actions.log'), logMessage, (err) => {
        if (err) {
            console.error('Error al registrar la acción:', err);
        }
    });
}

module.exports = (req, res, next) => {
    const { action, resource } = req.body;  // Suponiendo que la acción y el recurso vienen en el cuerpo de la solicitud
    const userId = req.user ? req.user.id : null;  // Obtener el ID del usuario si está autenticado

    if (action && resource && userId) {
        logAction(action, resource, userId);
    } else {
        console.error('No se proporcionó la acción, recurso o usuario.');
    }

    next(); // Continuar con la siguiente operación
};
