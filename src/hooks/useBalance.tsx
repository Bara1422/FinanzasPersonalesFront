import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import type { BalanceData } from '../types/balance.types';

export const useBalance = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { data, isLoading, error, status } = useQuery({
    queryKey: ['balance', usuario?.id_usuario],
    queryFn: async () => {
      const response = await apiAxios.get<BalanceData>(
        `/transacciones/resumen`,
      );
      return response.data;
    },
    enabled: !!usuario?.id_usuario,
  });

  return { data, isLoading, error, status };
};
