import { useState } from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { PaidNotificationsCard } from '@/features/notifications/components/PaidNotificationsCard';
import { PendingNotificationsCard } from '@/features/notifications/components/PendingNotificationsCard';
import { NotificationsDialog } from '@/features/notifications/dialog/NotificationsDialog';
import { useNotificationsData } from '@/features/notifications/hooks/useNotificationsData';
import { getAllCategories } from '@/lib/getAllCategories';

export const NotificationsPage = () => {
  const categories = getAllCategories();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { notifications, pendingNotifications, addNotification, markAsPaid } =
    useNotificationsData(1);

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
        markAsPaid={markAsPaid}
        filteredNotifications={notifications}
        pendingNotifications={pendingNotifications}
        getDaysLeft={getDaysLeft}
        categories={categories}
      />

      {/* Paid History */}
      <PaidNotificationsCard
        filteredNotifications={notifications}
        categories={categories}
      />

      <NotificationsDialog
        filteredNotifications={notifications}
        open={isOpenDialog}
        addNotification={addNotification}
        onOpenChange={handleOpenDialog}
        categories={categories}
      />
    </div>
  );
};
