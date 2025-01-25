
// Verifica si el usuario tiene una sesión activa
function checkSession(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ msg: 'Usuario no autenticado.' });
    }

    // Si la sesión es válida, pasamos al siguiente middleware o ruta
    console.log(`Sesión activa para el usuario ${req.session.user.id}`);
    next();
}

// Middleware para establecer una sesión cuando el usuario inicia sesión
function createSession(req, res, next) {
    req.session.user = { id: req.body.userId, role: req.body.role };  // Simulación de inicio de sesión
    console.log(`Sesión creada para el usuario ${req.session.user.id}`);
    next();
}

module.exports = { checkSession, createSession };
