import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import type { Transaction } from '@/mocks/transaccion.mock';

export const useTransactions = () => {
  const { data, error, isLoading, status } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await apiAxios.get<Transaction[]>('/transacciones');
      return response.data;
    },
  });

  return { data, error, isLoading, status };
};
