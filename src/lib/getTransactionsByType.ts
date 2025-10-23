import type { Category } from '@/mocks/category.mock';
import type { Transaction } from '@/mocks/transaccion.mock';

export const getTransactionsByType = (
  transactions: Transaction[],
  categoriesMap: Record<string, Category>,
) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    const category = categoriesMap[transaction.id_categoria];
    if (category.tipo === 'INGRESO') {
      totalIncome += transaction.monto;
    } else {
      totalExpense += transaction.monto;
    }
  });

  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
};
