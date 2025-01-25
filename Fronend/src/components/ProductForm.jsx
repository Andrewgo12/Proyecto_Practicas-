import React, { useState } from 'react';

const ProductForm = ({ onSubmit, product = {} }) => {
    const [name, setName] = useState(product.name || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState(product.price || '');
    const [category, setCategory] = useState(product.category || '');
    const [quantity, setQuantity] = useState(product.quantity || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, description, price, category, quantity };
        onSubmit(newProduct);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Descripción:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label>Precio:</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <label>Categoría:</label>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <label>Cantidad:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <button type="submit">Guardar Producto</button>
        </form>
    );
};

export default ProductForm;
