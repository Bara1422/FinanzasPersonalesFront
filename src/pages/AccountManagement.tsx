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
  const isHydrated = useAuthStore((state) => state.isHydrated);


  /* if (!id) {
    return <Navigate to="/dashboard" replace />;
  } */

  if (!isHydrated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const targetUserId = Number(id);
  const canView = user && user.id_usuario === targetUserId;

  if (!canView) {
    return <Navigate to={`/account/${user?.id_usuario}`} replace />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <PageTitle
        title="Configuracion de Cuenta"
        subtitle="Gestiona tu perfil"
      />

      {/* User Info */}
      <ProfileInfo />

      {/* User Card */}
      <Card>
        <CardHeaderCustom
          title="Información de la Cuenta"
          description="Actualiza tu información de perfil"
        />

        {/* Form */}
        <UserFormData />
      </Card>
    </div>
  );
};
