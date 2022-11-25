import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/containers/Dashboard";
import Login from "../components/containers/Login";

const Router = () => {
   return(
       <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
       </Routes>
   )
}

export default Router;