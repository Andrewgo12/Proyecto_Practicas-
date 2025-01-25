// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// Método para verificar si una sesión ha expirado
sessionSchema.methods.isExpired = function() {
    return this.expiresAt < Date.now();
};

// Crear y exportar el modelo
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
