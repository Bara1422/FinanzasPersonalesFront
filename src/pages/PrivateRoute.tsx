import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const PrivateRoute = () => {
  const { usuario, token } = useAuthStore();

  if (!usuario || !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
