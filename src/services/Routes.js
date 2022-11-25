import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/containers/Dashboard";
import Login from "../components/containers/Login";
import Register from "../components/containers/Register"

const Router = () => {
   return(
       <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
       </Routes>
   )
}

export default Router;