import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';

import { useAuthStore } from '@/store/authStore';
import type { Transaction } from '@/types/transaction.types';

export const useTransactions = () => {
  const { data, error, isLoading, status, fetchStatus } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await apiAxios.get<Transaction[]>('/transacciones');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading, status, fetchStatus };
};

export const useTransactionCreate = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (
      newTransaction: Omit<
        Transaction,
        'id_transaccion' | 'id_usuario' | 'fecha'
      >,
    ) => {
      await apiAxios.post('/transacciones', {
        ...newTransaction,

        fecha: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['balance', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });
};

export const useTransactionDelete = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (transactionId: number) => {
      await apiAxios.delete(`/transacciones/${transactionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['balance', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });
};

export const useTransactionUpdate = () => {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((state) => state.usuario);

  return useMutation({
    mutationFn: async (updatedTransaction: Partial<Transaction>) => {
      await apiAxios.patch(
        `/transacciones/${updatedTransaction.id_transaccion}`,
        updatedTransaction,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['balance', usuario?.id_usuario],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });
};

export const useTransactionById = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      if (!id) throw new Error('id requerido');
      const response = await apiAxios.get<Transaction>(`/transacciones/${id}`);
      return response.data;
    },
    
    initialData: () => {
      const transactions = queryClient.getQueryData<Transaction[]>([
        'transactions',
      ]);
      return transactions?.find((t) => t.id_transaccion === id);
    },
  });
};
