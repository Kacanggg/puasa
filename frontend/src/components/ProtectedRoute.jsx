import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import {jwtDecode} from "jwt-decode"


const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token")
    
    if (!token) {
        return <Navigate to="/" replace />;
    }
    
    try {
        const decoded = jwtDecode(token)
        if(!allowedRoles.includes(decoded.role)){
                return <Navigate to="/" replace/>
        }   
    } catch(error){
        console.error("Invalid Token:", error)
        return <Navigate to="/" replace/>
    }
    return <Outlet/>

}

export default ProtectedRoute;
