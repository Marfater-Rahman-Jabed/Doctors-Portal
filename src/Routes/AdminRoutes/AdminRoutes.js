import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../../Loading/Loading'

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [admin, adminLoading] = useAdmin(user?.email)
    const location = useLocation();
    if (loading || adminLoading) {
        return <Loading></Loading>

    }
    if (user && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />
};

export default AdminRoute;