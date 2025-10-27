import { useState } from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { NotificationsDialog } from '@/components/notifications/dialog/NotificationsDialog';
import { PaidNotificationsCard } from '@/components/notifications/PaidNotificationsCard';
import { PendingNotificationsCard } from '@/components/notifications/PendingNotificationsCard';
import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/lib/getAllCategories';
import { mockNotifications } from '@/mocks/notification.mock';

export const NotificationsPage = () => {
  const categories = getAllCategories();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const filteredNotifications = mockNotifications.filter(
    (user) => user.id_usuario === 1,
  );
  const pendingNotifications = filteredNotifications.filter(
    (notification) => !notification.pagado,
  );

  const getDaysLeft = (dayDate: string) => {
    const today = new Date();
    const due = new Date(dayDate);
    const diffTime = due.getTime() - today.getTime();
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
          Nueva Notificación
        </Button>
      </div>

      {/* Notifications */}
      <PendingNotificationsCard
        filteredNotifications={filteredNotifications}
        pendingNotifications={pendingNotifications}
        getDaysLeft={getDaysLeft}
        categories={categories}
      />

      {/* Paid History */}
      <PaidNotificationsCard
        filteredNotifications={filteredNotifications}
        categories={categories}
      />

      <NotificationsDialog
        filteredNotifications={filteredNotifications}
        open={isOpenDialog}
        onOpenChange={handleOpenDialog}
        categories={categories}
      />
    </div>
  );
};
