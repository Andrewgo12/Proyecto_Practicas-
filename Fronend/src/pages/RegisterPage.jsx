import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiClient from '../services/apiClient';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Función para manejar el registro de un nuevo usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient('/register', 'POST', { email, password });
            history.push('/login');
        } catch (error) {
            alert('Error al registrar el usuario');
        }
    };

    return (
        <div>
            <h1>Registrar cuenta</h1>
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPage;
