const winston = require('winston');

// Configuración de winston para registrar logs
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

// Función para registrar un mensaje de información
function logInfo(message) {
    logger.info(message);
}

// Función para registrar un mensaje de advertencia
function logWarning(message) {
    logger.warn(message);
}

// Función para registrar un mensaje de error
function logError(message) {
    logger.error(message);
}

module.exports = {
    logInfo,
    logWarning,
    logError
};

