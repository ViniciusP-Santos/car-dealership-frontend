import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../components/containers/Dashboard";
import Login from "../components/containers/Login";
import RegisterCollaborators from "../components/containers/Collaborators/Register"
import NotFound from "../components/containers/NotFound"
import Collaborators from "../components/containers/Collaborators/Collaborators"
import UpdateCollaborators from "../components/containers/Collaborators/Update";
import VehiclesStore from "../components/containers/Vehicles/Store";
import RegisterVehicles from "../components/containers/Vehicles/RegisterVehicles";
import ViewProduct from "../components/containers/Vehicles/viewProduct";
import Customers from "../components/containers/Clients/Customers";
import RegisterCLients from "../components/containers/Clients/RegisterClients";
import UpdateClients from "../components/containers/Clients/UpdateClients";
import Sales from "../components/containers/Sales";

const PrivateRouteAdmin = ({ children, redirectTo }) => {
    return sessionStorage.getItem('auth') ? children : <Navigate to={redirectTo} />;
};

const PrivateRoute = ({ children, redirectTo }) => {
    return sessionStorage.getItem('auth') ? children : <Navigate to={redirectTo} />;
};
const Router = () => {
   return(
    <Routes>
        {/* Routes Admin  */}
        <Route
            path="/register"
            element={
            <PrivateRouteAdmin redirectTo="/login">
                <RegisterCollaborators />
            </PrivateRouteAdmin>
            }
        />
        <Route
            path="/update-collaborators"
            element={
            <PrivateRouteAdmin redirectTo="/login">
                <UpdateCollaborators />
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
            path="/vehicles" 
            element={
            <PrivateRoute redirectTo="/login">
                <VehiclesStore />
            </PrivateRoute>
            }
        />
        <Route 
            path="/sales" 
            element={
            <PrivateRoute redirectTo="/login">
                <Sales />
            </PrivateRoute>
            }
        />  
        <Route 
            path="/register-vehicles" 
            element={
            <PrivateRoute redirectTo="/login">
                <RegisterVehicles />
            </PrivateRoute>
            }
        /> 
        <Route 
            path="/view-vehicle/:productId" exact
            element={
            <PrivateRoute redirectTo="/login">
                <ViewProduct />
            </PrivateRoute>
            }
        /> 
        <Route 
            path="/customers" 
            element={
            <PrivateRoute redirectTo="/login">
                <Customers />
            </PrivateRoute>
            }
        /> 
        <Route 
            path="/register-client" 
            element={
            <PrivateRoute redirectTo="/login">
                <RegisterCLients />
            </PrivateRoute>
            }
        /> 
        <Route
            path="/update-clients"
            element={
            <PrivateRouteAdmin redirectTo="/login">
                <UpdateClients />
            </PrivateRouteAdmin>
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
        <Route path="/car-dealership-frontend" element={<Navigate to="/" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />}/>
        <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
   );
}

export default Router;