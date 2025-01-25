const moment = require('moment');

// Formatear la fecha en el formato 'YYYY-MM-DD'
function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

// Obtener la fecha actual
function getCurrentDate() {
    return moment().format('YYYY-MM-DD');
}

// Obtener la fecha y hora actual
function getCurrentDateTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

// Obtener la diferencia en días entre dos fechas
function getDaysDifference(date1, date2) {
    const startDate = moment(date1);
    const endDate = moment(date2);
    return endDate.diff(startDate, 'days');
}

// Verificar si una fecha es antes de la actual
function isBeforeCurrentDate(date) {
    return moment(date).isBefore(moment());
}

// Verificar si una fecha es después de la actual
function isAfterCurrentDate(date) {
    return moment(date).isAfter(moment());
}

// Obtener el primer día del mes actual
function getFirstDayOfMonth() {
    return moment().startOf('month').format('YYYY-MM-DD');
}

// Obtener el último día del mes actual
function getLastDayOfMonth() {
    return moment().endOf('month').format('YYYY-MM-DD');
}

// Obtener el día de la semana
function getDayOfWeek(date) {
    return moment(date).format('dddd');
}

// Convertir un string de fecha a objeto Date
function convertStringToDate(dateString) {
    return moment(dateString).toDate();
}

module.exports = {
    formatDate,
    getCurrentDate,
    getCurrentDateTime,
    getDaysDifference,
    isBeforeCurrentDate,
    isAfterCurrentDate,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getDayOfWeek,
    convertStringToDate
};

