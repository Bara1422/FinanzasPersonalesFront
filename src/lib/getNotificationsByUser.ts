import { mockNotifications } from '@/mocks/notification.mock';

export const getNotificationsByUser = (userId: number) => {
  return mockNotifications.filter(
    (notification) => notification.id_usuario === userId,
  );
};
