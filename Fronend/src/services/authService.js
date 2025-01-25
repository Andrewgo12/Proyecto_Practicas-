const API_URL = "/api/auth";

/**
 * Función para iniciar sesión.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<object>} - Información del usuario autenticado.
 */
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al iniciar sesión");
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

/**
 * Función para registrar un nuevo usuario.
 * @param {object} userData - Datos del nuevo usuario.
 * @returns {Promise<object>} - Información del usuario registrado.
 */
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al registrar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

/**
 * Función para cerrar sesión del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<void>} - Confirmación de cierre de sesión.
 */
export const logout = async (token) => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al cerrar sesión");
        }
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

/**
 * Función para verificar el estado de autenticación del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<object>} - Información del usuario autenticado.
 */
export const verifyAuth = async (token) => {
    try {
        const response = await fetch(`${API_URL}/verify`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al verificar autenticación");
        }

        return await response.json();
    } catch (error) {
        console.error("Verify auth error:", error);
        throw error;
    }
};

/**
 * Función para solicitar el restablecimiento de contraseña.
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<void>} - Confirmación de solicitud enviada.
 */
export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch(`${API_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al solicitar restablecimiento de contraseña");
        }
    } catch (error) {
        console.error("Request password reset error:", error);
        throw error;
    }
};

/**
 * Función para cambiar la contraseña del usuario.
 * @param {string} token - Token de restablecimiento.
 * @param {string} newPassword - Nueva contraseña.
 * @returns {Promise<void>} - Confirmación de contraseña actualizada.
 */
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al restablecer contraseña");
        }
    } catch (error) {
        console.error("Reset password error:", error);
        throw error;
    }
};
