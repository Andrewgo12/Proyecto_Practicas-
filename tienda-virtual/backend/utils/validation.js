// Función para validar correo electrónico
function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

// Función para validar número de teléfono
function validatePhoneNumber(phoneNumber) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
}

// Función para validar una contraseña segura
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

// Función para validar un nombre de usuario
function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_]{3,15}$/;
    return regex.test(username);
}

// Función para validar una URL
function validateUrl(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return regex.test(url);
}

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validatePassword,
    validateUsername,
    validateUrl
};

