// events/orderEvent.js
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Evento cuando se crea una nueva orden
eventEmitter.on('orderCreated', (order) => {
    console.log(`Nueva orden creada: ${order.id}`);
});

// Evento cuando una orden es actualizada
eventEmitter.on('orderUpdated', (order) => {
    console.log(`Orden actualizada: ${order.id}`);
});

// Evento cuando una orden es eliminada
eventEmitter.on('orderDeleted', (order) => {
    console.log(`Orden eliminada: ${order.id}`);
});

module.exports = eventEmitter;
