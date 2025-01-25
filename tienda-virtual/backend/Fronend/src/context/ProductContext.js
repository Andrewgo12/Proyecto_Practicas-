import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error loading products:", error));
    }, []);

    const addProduct = (product) => setProducts([...products, product]);

    const removeProduct = (id) => {
        const filtered = products.filter((product) => product.id !== id);
        setProducts(filtered);
    };

    const updateProduct = (id, updatedProduct) => {
        const updated = products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
        );
        setProducts(updated);
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, removeProduct, updateProduct, loading }}
        >
            {children}
        </ProductContext.Provider>
    );
};
