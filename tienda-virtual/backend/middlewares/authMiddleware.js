// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de tener un modelo de usuario

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ msg: 'Acceso denegado. No se encontró token.' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_clave_secreta');
        req.user = decoded;

        // Verificar si el usuario existe en la base de datos
        User.findById(req.user.id, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ msg: 'Usuario no encontrado o no autorizado.' });
            }

            if (!user.isActive) {
                return res.status(403).json({ msg: 'Tu cuenta está desactivada.' });
            }

            next();  // Si todo está bien, pasamos al siguiente middleware
        });

    } catch (error) {
        return res.status(400).json({ msg: 'Token inválido.' });
    }
}

module.exports = authMiddleware;
