import React from 'react'
import { Navigate } from 'react-router-dom'


export const PublicRoute = ({isLoggedIn,children}) => {
   
    return isLoggedIn ? <Navigate to = "/"/> : children
}
