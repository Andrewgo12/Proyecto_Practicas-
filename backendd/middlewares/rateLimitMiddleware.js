
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,  // Límite de 100 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.',
    handler: (req, res, next) => {
        console.warn(`Exceso de solicitudes detectado desde la IP: ${req.ip}`);
        res.status(429).json({ msg: 'Límite de solicitudes alcanzado, intente nuevamente en 15 minutos.' });
    }
});

module.exports = rateLimiter;
