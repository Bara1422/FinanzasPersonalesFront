import type { User } from '@/mocks/user.mock';
import { Badge } from '../ui/badge';

export const ProfileInfo = ({ mockUser }: { mockUser: User }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{mockUser.nombre}</h2>
        <p className="text-muted-foreground">{mockUser.email}</p>
        <Badge className="mt-2" variant={'outline'}>
          {mockUser.rol === 'ADMIN' ? 'Administrador' : 'Usuario'}
        </Badge>
        <Badge className="mt-2 ml-2" variant={'default'}>
          Miembro desde {mockUser.created_at.toLocaleDateString('es-ES')}
        </Badge>
      </div>
    </div>
  );
};
