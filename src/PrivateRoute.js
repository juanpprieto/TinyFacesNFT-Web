import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/auth'

function PrivateRoute({ children }) {
    const { authToken } = useAuth()

    return authToken ? children : <Navigate to="/" />
}

export default PrivateRoute
