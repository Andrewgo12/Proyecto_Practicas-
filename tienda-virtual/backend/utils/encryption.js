const bcrypt = require('bcrypt');

// Función para cifrar una contraseña
function encryptPassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

// Función para comparar una contraseña con un hash
function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

// Función para verificar si la contraseña cumple con un mínimo de caracteres
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

// Función para generar un token de seguridad basado en contraseña
function generateToken(password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

// Función para comprobar si un token coincide con un hash
function compareToken(token, hashedToken) {
    return bcrypt.compareSync(token, hashedToken);
}

module.exports = {
    encryptPassword,
    comparePassword,
    validatePassword,
    generateToken,
    compareToken
};
