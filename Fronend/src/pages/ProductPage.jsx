import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import apiClient from '../services/apiClient';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const history = useHistory();

    // Cargar los detalles del producto
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

    // Función para editar el producto
    const editProduct = () => {
        history.push(`/edit-product/${productId}`);
    };

    return (
        <div>
            <h1>Detalles del Producto</h1>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Categoría: {product.category}</p>
                    <p>Inventario: {product.quantity}</p>
                    <button onClick={editProduct}>Editar Producto</button>
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ProductPage;
