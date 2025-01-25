// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Definición del esquema del modelo de usuario
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Por favor ingresa un correo electrónico válido']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    }
});

// Encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (err) {
            next(err);
        }
    }
    next();
});

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Método para generar un token JWT para el usuario
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id, username: this.username }, 'secret_key', { expiresIn: '1h' });
    return token;
};

// Crear y exportar el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
