
// events/productNotification.js
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Evento cuando un producto es añadido
eventEmitter.on('productAdded', (product) => {
    console.log(`Nuevo producto añadido: ${product.name}`);
});

// Evento cuando un producto es eliminado
eventEmitter.on('productRemoved', (product) => {
    console.log(`Producto eliminado: ${product.name}`);
});

module.exports = eventEmitter;
