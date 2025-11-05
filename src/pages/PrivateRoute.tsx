import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const PrivateRoute = () => {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const usuario = useAuthStore((state) => state.usuario);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isHydrated && !usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <Outlet />;
};
