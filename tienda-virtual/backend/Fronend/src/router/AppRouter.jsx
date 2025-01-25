import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Este componente maneja todas las rutas de la aplicación, cargando las páginas adecuadas
// dependiendo de la ruta solicitada por el usuario.
const AppRouter = () => {
    return (
        <Router>
            <Header />
            <main>
                <Switch>
                    {/* Ruta para la página principal */}
                    <Route exact path="/" component={HomePage} />

                    {/* Rutas para login y registro */}
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />

                    {/* Ruta privada para gestionar productos, solo accesible si el usuario está autenticado */}
                    <PrivateRoute path="/products" component={ProductPage} />

                    {/* Ruta por defecto (si no se encuentra la página solicitada) */}
                    <Route path="*">
                        <h2>Página no encontrada</h2>
                    </Route>
                </Switch>
            </main>
            <Footer />
        </Router>
    );
};

export default AppRouter;
