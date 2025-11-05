import { Navigate, Outlet, useParams } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const UserRoute = () => {
  const { id } = useParams();
  const usuario = useAuthStore((state) => state.usuario);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated && !usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (Number(id) !== usuario.id_usuario) {
    return <Navigate to={`/account/${usuario.id_usuario}`} replace />;
  }
  return <Outlet />;
};
