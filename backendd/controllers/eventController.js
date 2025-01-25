// controllers/eventController.js
const Event = require('../models/Event'); // Modelo de Evento

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
    const { title, description, startDate, endDate } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            startDate,
            endDate,
        });

        await newEvent.save();
        res.status(201).json({ msg: 'Evento creado con éxito', event: newEvent });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener un evento específico por ID
exports.getEventById = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar un evento
exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, description, startDate, endDate } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, description, startDate, endDate },
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        res.json({ msg: 'Evento actualizado', event: updatedEvent });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        res.json({ msg: 'Evento eliminado con éxito' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
