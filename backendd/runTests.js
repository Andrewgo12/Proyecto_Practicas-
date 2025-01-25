// runTests.js
const path = require('path');
const Mocha = require('mocha');
const fs = require('fs');
const mocha = new Mocha();

// Directorio de pruebas
const testDir = path.join(__dirname, 'tests');

// Agregar archivos de prueba al runner de Mocha
fs.readdirSync(testDir).filter(file => file.endsWith('.test.js')).forEach(file => {
    mocha.addFile(path.join(testDir, file));
});

// Ejecutar las pruebas
mocha.run(failures => {
    if (failures) {
        console.log(`Algunas pruebas han fallado: ${failures}`);
        process.exit(1);
    } else {
        console.log('Todas las pruebas pasaron con éxito');
        process.exit(0);
    }
});
