import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const PrivateRoute = () => {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const usuario = useAuthStore((state) => state.usuario);

  if (isHydrated === false) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
