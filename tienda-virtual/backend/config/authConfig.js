// config/authConfig.js
module.exports = {
    jwtExpiration: '1h', // Duración del token
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // Clave secreta
};
