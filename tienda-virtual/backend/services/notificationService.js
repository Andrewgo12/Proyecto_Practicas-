// services/notificationProduct.js
const nodemailer = require('nodemailer');
const User = require('../models/User');

const sendNotification = async (userId, message) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu-email@gmail.com',
            pass: 'tu-password',
        },
    });

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: user.email,
        subject: 'Notificación de Producto',
        text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log('Notificación enviada');
};

module.exports = { sendNotification };

