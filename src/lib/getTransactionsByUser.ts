import { mockTransactions } from '@/mocks/transaccion.mock';

export const getTransactionsByUser = (userId: string) => {
  return mockTransactions.filter(
    (transaction) => transaction.id_usuario === userId,
  );
};
