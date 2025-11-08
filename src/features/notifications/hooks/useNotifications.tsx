import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import type { Notification } from '@/types/notification.type';
import type { Transaction } from '@/types/transaction.types';

export const useNotifications = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['notifications', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<Notification[]>('/notificaciones');
      return response.data;
    },
    initialData: [],
  });

  return { data, isLoading, error, status, fetchStatus };
};

export const useNotificationsPending = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['notificationsPending', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<Notification[]>(
        '/notificaciones/pending',
      );
      return response.data;
    },
    initialData: [],
  });

  return { data, isLoading, error, status, fetchStatus };
};

export const useNotificationsPaid = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['notificationsPaid', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<Notification[]>(
        '/notificaciones/paid',
      );
      return response.data;
    },
    initialData: [],
  });

  return { data, isLoading, error, status, fetchStatus };
};

export const useNotificationMarkAsPaid = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (notificacion: Notification) => {
      await apiAxios.post(
        `/notificaciones/${notificacion.id_notificacion}/pagar`,
      );
      return notificacion;
    },
    onSuccess: async (notificacion) => {
      try {
        await apiAxios.post<Transaction>('/transacciones', {
          id_usuario: usuario?.id_usuario,
          monto: notificacion.monto,
          id_categoria: notificacion.id_categoria,
          descripcion: notificacion.descripcion,
          fecha: new Date().toISOString().split('T')[0],
        });
      } catch (e) {
        console.error('Error al crear transaccion:', e);
      }
      queryClient.invalidateQueries({
        queryKey: ['notificationsPending', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['notificationsPaid', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['notifications', usuario?.id_usuario],
      });
    },
  });
};

export const useNotificationCreate = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (
      newNotification: Omit<
        Notification,
        'id_notificacion' | 'pagado' | 'id_usuario'
      >,
    ) => {
      const response = await apiAxios.post<Notification>(
        '/notificaciones',
        newNotification,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['notificationsPending', usuario?.id_usuario],
      });
    },
  });
};

export const useNotificationDelete = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (id_notificacion: number) => {
      await apiAxios.delete(`/notificaciones/${id_notificacion}`);
      return id_notificacion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['notificationsPending', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['notificationsPaid', usuario?.id_usuario],
      });
    },
  });
};
