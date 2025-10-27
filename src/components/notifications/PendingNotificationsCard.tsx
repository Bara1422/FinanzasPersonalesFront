import type { Category } from '@/mocks/category.mock';
import type { Notification } from '@/mocks/notification.mock';
import { Card, CardContent } from '../ui/card';
import { NoPendingNotifications } from './NoPendingNotifications';
import { NotificationsButtons } from './NotificationsButtons';
import { NotificationsCardHeader } from './NotificationsCardHeader';
import { NotificationsDaysLeft } from './NotificationsDaysLeft';
import { NotificationsMessage } from './NotificationsMessage';

interface Props {
  filteredNotifications: Notification[];
  pendingNotifications: Notification[];
  getDaysLeft: (dayDate: string) => number;
  categories: Category[];
}

export const PendingNotificationsCard = ({
  filteredNotifications,
  pendingNotifications,
  getDaysLeft,
  categories,
}: Props) => {
  /* Color Prioridad */
  const getPriorityColor = (daysLeft: number) => {
    return daysLeft < 0
      ? 'border-destructive bg-destructive/5'
      : daysLeft <= 3
        ? 'border-yellow-500/50 bg-yellow-500/5'
        : '';
  };

  return (
    <Card>
      <NotificationsCardHeader filteredNotifications={filteredNotifications} />
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
                      ${getPriorityColor(daysLeft)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-2">
                      {/* Message */}
                      <NotificationsMessage
                        notification={notification}
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
                    <NotificationsButtons />
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
