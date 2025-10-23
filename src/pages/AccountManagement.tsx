import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageTitle } from '@/components/common/PageTitle';
import { ProfileInfo } from '@/components/common/ProfileInfo';
import { UserFormData } from '@/components/forms/UserFormData';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUsers, type User } from '@/mocks/user.mock';

export const AccountManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFound = mockUsers.find((user) => user.id_usuario === Number(id));
    if (!userFound) {
      alert('Usuario no encontrado');
      navigate('/');
    } else {
      setUser(userFound);
    }
  }, [id, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Configuracion de Cuenta"
        subtitle="Gestiona tu perfil"
      />

      {/* User Info */}
      <ProfileInfo mockUser={user} />

      {/* User Card */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
        </CardHeader>

        {/* Form */}
        <UserFormData mockUser={user} />
      </Card>
    </div>
  );
};
