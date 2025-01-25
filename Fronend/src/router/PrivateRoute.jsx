import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useUser();

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

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export const checkPrivateRoute = (user, requiredRole) => {
    if (!user || !requiredRole) return false;
    return user.role === requiredRole;
};

export default PrivateRoute;
