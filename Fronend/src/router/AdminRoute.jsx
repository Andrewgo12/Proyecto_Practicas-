import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
    const { user, loading } = useUser();

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

    if (!user || user.role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;
