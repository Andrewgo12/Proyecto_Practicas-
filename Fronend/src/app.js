import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import EditProductPage from './pages/EditProductPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/product/:productId" component={ProductPage} />
                        <PrivateRoute path="/edit-product/:productId" component={EditProductPage} />
                        <PrivateRoute path="/add-product" component={EditProductPage} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
