// controllers/notificationController.js
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Configuración del servicio de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes cambiarlo a otro proveedor si lo prefieres
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Enviar una notificación por correo electrónico
exports.sendEmailNotification = async (req, res) => {
    const { userId, subject, message } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject,
            text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al enviar correo electrónico');
            }
            res.json({ msg: 'Notificación enviada', info });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};

// Enviar una notificación de pedido
exports.sendOrderNotification = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }

        const user = await User.findById(order.userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const subject = 'Confirmación de Pedido';
        const message = `Hola ${user.name}, tu pedido con ID: ${orderId} ha sido procesado y está siendo preparado.`;

        await this.sendEmailNotification({ userId: user._id, subject, message });
        res.json({ msg: 'Notificación de pedido enviada' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
};
