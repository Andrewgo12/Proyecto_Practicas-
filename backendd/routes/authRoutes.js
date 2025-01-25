// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registro de un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son requeridos' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
});

// Validar token de autenticación
router.get('/validate', async (req, res) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se ha proporcionado un token' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: 'Token inválido', error });
    }
});

module.exports = router;
