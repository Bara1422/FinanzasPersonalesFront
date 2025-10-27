import { useMemo } from 'react';
import { getAllCategories } from '@/lib/getAllCategories';
import { getTransactionsByType } from '@/lib/getTransactionsByType';
import { getTransactionsByUser } from '@/lib/getTransactionsByUser';

export const useTransactionsData = (userId: number) => {
  const transactions = getTransactionsByUser(userId);
  const categoriesNames = getAllCategories();

  const categoriesMap = useMemo(
    () =>
      Object.fromEntries(
        categoriesNames.map((category) => [category.id_categoria, category]),
      ),
    [categoriesNames],
  );

  const { totalIncome, totalExpense, balance } = useMemo(
    () => getTransactionsByType(transactions, categoriesMap),
    [transactions, categoriesMap],
  );

  return { totalIncome, totalExpense, balance, transactions, categoriesMap, categoriesNames };
};
