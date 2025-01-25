// routes/actions.js
const express = require('express');
const router = express.Router();
const Action = require('../models/Action');
const { authMiddleware } = require('../middleware/authMiddleware');

// Registrar una nueva acción de usuario
router.post('/', authMiddleware, async (req, res) => {
    const { actionType, actionDetails, ipAddress } = req.body;

    if (!actionType) {
        return res.status(400).json({ message: 'El tipo de acción es requerido.' });
    }

    try {
        const newAction = new Action({
            userId: req.user._id,
            actionType,
            actionDetails,
            ipAddress
        });
        await newAction.save();
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la acción', error });
    }
});

// Obtener todas las acciones de un usuario
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const actions = await Action.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las acciones', error });
    }
});

// Obtener todas las acciones por tipo
router.get('/type/:actionType', authMiddleware, async (req, res) => {
    try {
        const actions = await Action.find({ actionType: req.params.actionType });
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las acciones', error });
    }
});

module.exports = router;
