import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import type { Notification } from '@/types/notification.type';

export const useNotifications = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status } = useQuery({
    queryKey: ['notifications', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<Notification[]>('/notificaciones');
      return response.data;
    },
  });

  return { data, isLoading, error, status };
};

export const useNotificationsPending = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status } = useQuery({
    queryKey: ['notificationsPending', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<Notification[]>('/notificaciones/pending');
      return response.data;
    },
  });

  return { data, isLoading, error, status };
};
