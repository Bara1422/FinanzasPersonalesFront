import { Navigate, useParams } from 'react-router';
import { PageTitle } from '@/components/common/PageTitle';
import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import { Card } from '@/components/ui/card';
import { ProfileInfo } from '@/features/account/ProfileInfo';
import { UserFormData } from '@/features/account/UserFormData';
import { useAuthStore } from '@/store/authStore';

export const AccountManagement = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.usuario);
  console.log(user)

  if (!user || !id) {
    return <Navigate to="/login" replace />;
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
