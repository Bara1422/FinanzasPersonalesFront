import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import type { User } from '@/mocks/user.mock';
import { useAuthStore } from '@/store/authStore';

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (updatedUser: Partial<User>) => {
      if (!usuario) throw new Error('No hay usuario autenticado');
      await apiAxios.patch(`/usuarios/${usuario.id_usuario}`, updatedUser);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['user', usuario?.id_usuario],
      });
      await useAuthStore.getState().fetchUserData();
    },
  });
};
