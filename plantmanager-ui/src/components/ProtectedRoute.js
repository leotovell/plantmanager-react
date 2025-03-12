import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import RedDebugPage from "../pages/RedDebugPage";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/auth/check", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setIsAuthenticated(data.isAuthenticated);
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <RedDebugPage />; //Loading while authenticating

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
