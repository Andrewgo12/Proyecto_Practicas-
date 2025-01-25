const API_URL = "/api/products";

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al obtener los productos");
        }

        return await response.json();
    } catch (error) {
        console.error("Get all products error:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al obtener el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Get product by ID error:", error);
        throw error;
    }
};

export const createProduct = async (productData, token) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al crear el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Create product error:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al actualizar el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Update product error:", error);
        throw error;
    }
};

export const deleteProduct = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al eliminar el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Delete product error:", error);
        throw error;
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al buscar productos");
        }

        return await response.json();
    } catch (error) {
        console.error("Search products error:", error);
        throw error;
    }
};
