import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/auth"

import Dashboard from "../components/containers/Dashboard";
import Login from "../components/containers/Login";
import Register from "../components/containers/Register"
import NotFound from "../components/containers/NotFound"

const PrivateRouteAdmin = ({ children, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const PrivateRoute = ({ children, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const Router = () => {
   return(
    <Routes>
        <Route
            path="/register"
            element={
            <PrivateRouteAdmin redirectTo="/">
                <Register />
            </PrivateRouteAdmin>
            }
        />
        <Route path="/" element={<Login />} />
        <Route 
            path="/dashboard" 
            element={
            <PrivateRoute redirectTo="/">
                <Dashboard />
            </PrivateRoute>
            }
        /> 
        <Route path="/404" element={<NotFound />}/>
        <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
   );
}

export default Router;