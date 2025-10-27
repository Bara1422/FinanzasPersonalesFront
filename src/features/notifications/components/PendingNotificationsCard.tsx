import { Clock } from 'lucide-react';
import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import type { Category } from '@/mocks/category.mock';
import type { Notification } from '@/mocks/notification.mock';
import { Card, CardContent } from '../../../components/ui/card';
import { NoPendingNotifications } from './NoPendingNotifications';
import { NotificationsButtons } from './NotificationsButtons';
import { NotificationsDaysLeft } from './NotificationsDaysLeft';
import { NotificationsMessage } from './NotificationsMessage';

interface Props {
  filteredNotifications: Notification[];
  pendingNotifications: Notification[];
  getDaysLeft: (dayDate: string) => number;
  markAsPaid: (id_notificacion: number) => void;
  categories: Category[];
}

export const PendingNotificationsCard = ({
  filteredNotifications,
  pendingNotifications,
  getDaysLeft,
  markAsPaid,
  categories,
}: Props) => {
  /* Prioridad color */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'border-red-500/50 bg-red-500/10';
      case 'MEDIA':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'BAJA':
        return 'border-green-500/50 bg-green-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <Card>
      <CardHeaderCustom
        icon={<Clock className="h-5 w-5" />}
        title="Gastos Pendientes"
        description={`Gastos programados que aun no fueron pagados ${filteredNotifications.length}`}
      />
      <CardContent>
        {pendingNotifications.length === 0 ? (
          <NoPendingNotifications />
        ) : (
          <div className="space-y-4">
            {pendingNotifications.map((notification) => {
              const daysLeft = getDaysLeft(notification.fecha_vencimiento);
              const isUrgent = daysLeft <= 3;
              const isOver = daysLeft < 0;

              return (
                <div
                  key={notification.id_notificacion}
                  className={`flex items-start justify-between gap-4 p-4 rounded-lg border 
                      ${getPriorityColor(notification.prioridad)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-2">
                      {/* Message */}
                      <NotificationsMessage
                        notification={notification}
                        getPriorityColor={getPriorityColor}
                        categories={categories}
                      />

                      {/* Expiration Date */}
                      <NotificationsDaysLeft
                        notification={notification}
                        isUrgent={isUrgent}
                        isOver={isOver}
                        daysLeft={daysLeft}
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-destructive text-lg">
                      ${notification.monto.toLocaleString()}
                    </p>
                    <NotificationsButtons markAsPaid={markAsPaid} id_notificacion={notification.id_notificacion} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
