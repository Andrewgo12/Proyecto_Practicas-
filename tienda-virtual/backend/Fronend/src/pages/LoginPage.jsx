import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiClient from '../services/apiClient';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    // Función para manejar el inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiClient('/login', 'POST', { email, password });
            login(data.token);
            history.push('/');
        } catch (error) {
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
