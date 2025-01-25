const API_URL = "/api/orders";

export const getAllOrders = async (token) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al obtener las órdenes");
        }

        return await response.json();
    } catch (error) {
        console.error("Get all orders error:", error);
        throw error;
    }
};

export const getOrderById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al obtener la orden");
        }

        return await response.json();
    } catch (error) {
        console.error("Get order by ID error:", error);
        throw error;
    }
};

export const createOrder = async (orderData, token) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al crear la orden");
        }

        return await response.json();
    } catch (error) {
        console.error("Create order error:", error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al actualizar el estado de la orden");
        }

        return await response.json();
    } catch (error) {
        console.error("Update order status error:", error);
        throw error;
    }
};

export const deleteOrder = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al eliminar la orden");
        }

        return await response.json();
    } catch (error) {
        console.error("Delete order error:", error);
        throw error;
    }
};
