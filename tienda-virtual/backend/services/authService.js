// services/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (userData) => {
    const { email, password, nombre, rol } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Usuario ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, nombre, rol });

    await newUser.save();
    return newUser;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
    return token;
};

module.exports = { register, login };
