import { Navigate, Outlet, useParams } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const UserRoute = () => {
  const { id } = useParams();
  const usuario = useAuthStore((state) => state.usuario);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (Number(id) !== usuario.id_usuario) {
    return <Navigate to={`/account/${usuario.id_usuario}`} replace />;
  }
  return <Outlet />;
};
