import React, { createContext, useState, useEffect } from 'react';

// Crear un contexto para la autenticación
export const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para iniciar sesión y almacenar el token
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setUser(token);
    };

    // Función para cerrar sesión y eliminar el token
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    // Recuperar el token del almacenamiento local cuando se recarga la página
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUser(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
