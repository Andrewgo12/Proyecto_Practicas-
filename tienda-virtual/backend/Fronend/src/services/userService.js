const API_URL = "/api/users";

/**
 * Función para obtener la información de todos los usuarios.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<object[]>} - Lista de usuarios.
 */
export const getAllUsers = async (token) => {
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
            throw new Error(error.message || "Error al obtener usuarios");
        }

        return await response.json();
    } catch (error) {
        console.error("Get all users error:", error);
        throw error;
    }
};

/**
 * Función para obtener la información de un usuario por ID.
 * @param {string} id - ID del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<object>} - Información del usuario.
 */
export const getUserById = async (id, token) => {
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
            throw new Error(error.message || "Error al obtener el usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Get user by ID error:", error);
        throw error;
    }
};

/**
 * Función para actualizar la información de un usuario.
 * @param {string} id - ID del usuario.
 * @param {object} userData - Datos actualizados del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<object>} - Información del usuario actualizado.
 */
export const updateUser = async (id, userData, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al actualizar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Update user error:", error);
        throw error;
    }
};

/**
 * Función para eliminar un usuario.
 * @param {string} id - ID del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<void>} - Confirmación de eliminación.
 */
export const deleteUser = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al eliminar usuario");
        }
    } catch (error) {
        console.error("Delete user error:", error);
        throw error;
    }
};

/**
 * Función para cambiar la contraseña de un usuario.
 * @param {string} id - ID del usuario.
 * @param {string} newPassword - Nueva contraseña.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<void>} - Confirmación de cambio de contraseña.
 */
export const changeUserPassword = async (id, newPassword, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newPassword }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al cambiar contraseña");
        }
    } catch (error) {
        console.error("Change user password error:", error);
        throw error;
    }
};
