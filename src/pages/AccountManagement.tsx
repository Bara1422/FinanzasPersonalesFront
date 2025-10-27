import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageTitle } from '@/components/common/PageTitle';
import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import { Card } from '@/components/ui/card';
import { ProfileInfo } from '@/features/account/ProfileInfo';
import { UserFormData } from '@/features/account/UserFormData';
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
    <div className="space-y-6 p-6">
      {/* Title */}
      <PageTitle
        title="Configuracion de Cuenta"
        subtitle="Gestiona tu perfil"
      />

      {/* User Info */}
      <ProfileInfo mockUser={user} />

      {/* User Card */}
      <Card>
        <CardHeaderCustom
          title="Información de la Cuenta"
          description="Actualiza tu información de perfil"
        />

        {/* Form */}
        <UserFormData mockUser={user} />
      </Card>
    </div>
  );
};
