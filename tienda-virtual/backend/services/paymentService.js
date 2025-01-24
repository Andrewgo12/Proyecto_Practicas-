// services/payment.js
const stripe = require('stripe')('tu-clave-secreta');

const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Monto en centavos
            currency: 'usd',
        });
        return paymentIntent.client_secret;
    } catch (error) {
        throw new Error('Error al crear el pago');
    }
};

module.exports = { createPaymentIntent };
