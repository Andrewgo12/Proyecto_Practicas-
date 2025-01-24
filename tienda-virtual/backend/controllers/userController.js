// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el correo ya está registrado
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        // Crear un nuevo usuario
        user = new User({
            name,
            email,
            password,
            role,
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ msg: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const payload = {
            userId: user.id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener detalles de un usuario
exports.getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar detalles de un usuario
exports.updateUserDetails = async (req, res) => {
    const { name, email, password, role } = req.body;
    const userId = req.user.id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
