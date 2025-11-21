import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { PaidNotificationsCard } from '@/features/notifications/components/PaidNotificationsCard';
import { PendingNotificationsCard } from '@/features/notifications/components/PendingNotificationsCard';
import { NotificationsDialog } from '@/features/notifications/dialog/NotificationsDialog';
import { useAuthStore } from '@/store/authStore';

export const NotificationsPage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const usuario = useAuthStore((state) => state.usuario);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated) {
    return null;
  }

  if (!usuario) {
    return null;
  }

  const getDaysLeft = (dayDate: Date) => {
    const today = new Date();

    const diffTime = dayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleOpenDialog = (open: boolean) => {
    setIsOpenDialog(open);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-end">
        {/* Title */}
        <PageTitle
          title="Notificaciones"
          subtitle="Gestiona tus gastos futuros y vencimientos programados"
        />
        <Button
          onClick={() => setIsOpenDialog(true)}
          className="hover:cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nueva Notificación
        </Button>
      </div>

      {/* Notifications */}
      <PendingNotificationsCard getDaysLeft={getDaysLeft} />

      {/* Paid History */}
      <PaidNotificationsCard />

      <NotificationsDialog
        open={isOpenDialog}
        onOpenChange={handleOpenDialog}
      />
    </div>
  );
};
