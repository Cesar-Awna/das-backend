import { Outlet, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('user');
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default PrivateRoute;
