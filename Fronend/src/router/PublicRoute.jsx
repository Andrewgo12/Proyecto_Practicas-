import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useUser();

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <h2>Cargando...</h2>
            </div>
        );
    }

    // Si el usuario está autenticado, redirige al dashboard
    return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

export const checkPublicRoute = (user, allowedRoutes) => {
    if (!user) return true;
    return !allowedRoutes.includes(user.role);
};

export default PublicRoute;
