import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import ProductTable from '../components/ProductTable';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    // Cargar los productos al cargar la página
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiClient('/products');
                setProducts(data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProducts();
    }, []);

    // Redirigir a la página de creación de productos
    const goToAddProduct = () => {
        history.push('/add-product');
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <button onClick={goToAddProduct}>Agregar Producto</button>
            <ProductTable products={products} />
        </div>
    );
};

export default HomePage;

