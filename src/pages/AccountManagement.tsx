import { PageTitle } from '@/components/common/PageTitle';
import { ProfileInfo } from '@/components/common/ProfileInfo';
import { UserFormData } from '@/components/forms/UserFormData';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUser } from '@/mocks/user.mock';

export const AccountManagement = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Configuracion de Cuenta"
        subtitle="Gestiona tu perfil"
      />

      {/* User Info */}
      <ProfileInfo mockUser={mockUser} />

      {/* User Card */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
        </CardHeader>

        {/* Form */}
        <UserFormData mockUser={mockUser} />
        {/* </div> */}
      </Card>
    </div>
  );
};
