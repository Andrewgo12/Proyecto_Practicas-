import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import apiClient from '../services/apiClient';

const EditProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
    });
    const history = useHistory();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiClient(`/products/${productId}`);
                setProduct(data);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient(`/products/${productId}`, 'PUT', product);
            history.push(`/product/${productId}`);
        } catch (error) {
            alert('Error al actualizar el producto');
        }
    };

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <label>Descripción:</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <label>Precio:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <label>Categoría:</label>
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProductPage;
