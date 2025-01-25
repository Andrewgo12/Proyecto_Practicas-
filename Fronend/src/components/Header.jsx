import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Gestión de Productos</h1>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Registrar</Link>
            </nav>
        </header>
    );
};

export default Header;

