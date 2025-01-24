// controllers/productoController.js

const Producto = require('../models/Producto'); // Importamos el modelo de Producto

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, imagen } = req.body;
        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio,
            categoria,
            imagen,
        });

        await nuevoProducto.save();
        res.status(201).json({ mensaje: 'Producto creado con éxito', producto: nuevoProducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json({ productos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
};

// Obtener un producto específico por su ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ producto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el producto' });
    }
};

// Actualizar un producto por su ID
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, imagen } = req.body;
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precio, categoria, imagen },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto actualizado con éxito', producto: productoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto por su ID
exports.eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
};

// Buscar productos por nombre o categoría
exports.buscarProductos = async (req, res) => {
    try {
        const { nombre, categoria } = req.query;
        const filtros = {};

        if (nombre) {
            filtros.nombre = { $regex: nombre, $options: 'i' }; // Buscamos de forma insensible a mayúsculas/minúsculas
        }
        if (categoria) {
            filtros.categoria = categoria;
        }

        const productos = await Producto.find(filtros);
        res.status(200).json({ productos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar productos' });
    }
};

