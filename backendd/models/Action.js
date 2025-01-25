// models/Action.js
const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actionType: {
        type: String,
        required: true,
        enum: ['login', 'purchase', 'view', 'add_to_cart', 'update_profile', 'logout']
    },
    actionDetails: {
        type: String,
        required: false
    },
    ipAddress: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Métodos adicionales para registrar y obtener acciones pueden ser añadidos aquí

// Crear y exportar el modelo
const Action = mongoose.model('Action', actionSchema);
module.exports = Action;
