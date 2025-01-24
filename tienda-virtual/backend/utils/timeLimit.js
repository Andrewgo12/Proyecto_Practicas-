// Función para limitar el tiempo de ejecución de una función
function limitExecutionTime(func, timeLimit) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Tiempo de ejecución excedido')), timeLimit);
        func().then(result => {
            clearTimeout(timeout);
            resolve(result);
        }).catch(error => {
            clearTimeout(timeout);
            reject(error);
        });
    });
}

// Función para comprobar si una fecha es válida dentro de un límite de tiempo
function isValidWithinTimeLimit(date, timeLimit) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const diffInMillis = targetDate - currentDate;

    return diffInMillis <= timeLimit;
}

// Función para ejecutar una tarea repetidamente dentro de un límite de tiempo
function executeTaskWithinLimit(func, timeLimit) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (timeLimit <= 0) {
                clearInterval(interval);
                reject('Tiempo de ejecución agotado');
            } else {
                func();
                timeLimit -= 1000; // Disminuye el tiempo restante
            }
        }, 1000);
    });
}

module.exports = {
    limitExecutionTime,
    isValidWithinTimeLimit,
    executeTaskWithinLimit
};

