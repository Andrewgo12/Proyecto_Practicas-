// controllers/actionController.js
const Action = require('../models/Action');
const User = require('../models/User');

// Registrar acción de usuario
exports.registerAction = async (req, res) => {
    const { actionType, productId, quantity, totalPrice } = req.body;
    const userId = req.user.id;  // Obtenido del middleware de autenticación

    try {
        // Crear nueva acción de usuario
        const action = new Action({
            userId,
            actionType,
            productId,
            quantity,
            totalPrice,
            timestamp: new Date(),
        });

        await action.save();
        res.status(201).json(action);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener las acciones de un usuario
exports.getUserActions = async (req, res) => {
    const userId = req.user.id;

    try {
        const actions = await Action.find({ userId });
        res.json(actions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
