import { mockTransactions } from '@/mocks/transaccion.mock';

export const getTransactionsByUser = (userId: number) => {
  return mockTransactions.filter(
    (transaction) => transaction.id_usuario === userId,
  );
};
