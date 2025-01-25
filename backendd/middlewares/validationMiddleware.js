// middlewares/validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número positivo'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder los 500 caracteres'),

    // Validaciones adicionales si es necesario
    body('category')
        .notEmpty()
        .withMessage('La categoría del producto es obligatoria')
        .isIn(['Electrónica', 'Ropa', 'Alimentos'])
        .withMessage('Categoría inválida'),

    // Validar si hay errores en el cuerpo de la solicitud
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Si no hay errores, pasa al siguiente middleware o ruta
    }
];

module.exports = validateProduct;
