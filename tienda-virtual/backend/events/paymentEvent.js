// events/paymentEvent.js
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Evento cuando el pago es exitoso
eventEmitter.on('paymentSuccessful', (paymentDetails) => {
    console.log(`Pago exitoso para el pedido ${paymentDetails.orderId}`);
});

// Evento cuando el pago falla
eventEmitter.on('paymentFailed', (paymentDetails) => {
    console.log(`El pago falló para el pedido ${paymentDetails.orderId}`);
});

module.exports = eventEmitter;
