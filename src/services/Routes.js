import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/auth"

import Dashboard from "../components/containers/Dashboard";
import Login from "../components/containers/Login";
import Register from "../components/containers/Register"
import NotFound from "../components/containers/NotFound"
import Collaborators from "../components/containers/Collaborators"

const PrivateRouteAdmin = ({ children, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const PrivateRoute = ({ children, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const Router = () => {
   return(
    <Routes>
        {/* Routes Admin  */}
        <Route
            path="/register"
            element={
            <PrivateRouteAdmin redirectTo="/login">
                <Register />
            </PrivateRouteAdmin>
            }
        />
        <Route
            path="/colaborattors"
            element={
            <PrivateRouteAdmin redirectTo="/login">
                <Collaborators />
            </PrivateRouteAdmin>
            }
        />
        {/* Routes User */}
        <Route 
            path="/dashboard" 
            element={
            <PrivateRoute redirectTo="/login">
                <Dashboard />
            </PrivateRoute>
            }
        /> 
        <Route 
            path="/" 
            element={
            <PrivateRoute redirectTo="/login">
                <Dashboard />
            </PrivateRoute>
            }
        /> 
        {/* Routes Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />}/>
        <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
   );
}

export default Router;