import { useAuthStore } from '@/store/authStore';
import { Badge } from '../../components/ui/badge';

export const ProfileInfo = () => {
  const user = useAuthStore((state) => state.usuario);

  if (!user) {
    return null;
  }
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{user.nombre}</h2>
        <p className="text-muted-foreground">{user.email}</p>
        <Badge className="mt-2" variant={'outline'}>
          {user.rol === 'ADMIN' ? 'Administrador' : 'Usuario'}
        </Badge>
        <Badge className="mt-2 ml-2" variant={'default'}>
          Miembro desde {user.created_at.split('T')[0]}
        </Badge>
      </div>
    </div>
  );
};
