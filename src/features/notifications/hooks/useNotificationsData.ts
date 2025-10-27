import { useMemo, useState } from 'react';
import { getNotificationsByUser } from '@/lib/getNotificationsByUser';
import type { Notification } from '@/mocks/notification.mock';

export const useNotificationsData = (userId: number) => {
  const notificationsByUser = getNotificationsByUser(userId);
  const [notifications, setNotifications] = useState(notificationsByUser);

  const pendingNotifications = useMemo(() => {
   return notifications.filter((notification) => !notification.pagado);
  }, [notifications]);

  const paidNotifications = useMemo(() => {
    return notifications.filter((notification) => notification.pagado);
  }, [notifications]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const updatedNotification = (updatedNotification: Notification) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id_notificacion === updatedNotification.id_notificacion
          ? updatedNotification
          : notif,
      ),
    );
  };

  const deleteNotification = (id_notificacion: number) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id_notificacion !== id_notificacion),
    );
  };

  const markAsPaid = (id_notificacion: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id_notificacion === id_notificacion
          ? { ...notif, pagado: true }
          : notif,
      ),
    );
  };

  return {
    notifications,
    pendingNotifications,
    paidNotifications,
    addNotification,
    updatedNotification,
    deleteNotification,
    markAsPaid,
  };
};
