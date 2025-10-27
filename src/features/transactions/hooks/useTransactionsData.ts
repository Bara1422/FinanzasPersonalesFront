import { useMemo, useState } from 'react';
import { getAllCategories } from '@/lib/getAllCategories';
import { getTransactionsByType } from '@/lib/getTransactionsByType';
import { getTransactionsByUser } from '@/lib/getTransactionsByUser';

export const useTransactionsData = (userId: number) => {
  const transactionsByUser = getTransactionsByUser(userId);
  const [transactions, setTransactions] = useState(transactionsByUser);
  const categoriesNames = getAllCategories();

  const categoriesMap = useMemo(
    () =>
      Object.fromEntries(
        categoriesNames.map((category) => [category.id_categoria, category]),
      ),
    [categoriesNames],
  );

  const { totalIncome, totalExpense, balance } = useMemo(
    () => getTransactionsByType(transactionsByUser, categoriesMap),
    [transactionsByUser, categoriesMap],
  );

  const handleTransactions = (updatedTransactions: typeof transactions) => {
    setTransactions(updatedTransactions);
  };

  return {
    totalIncome,
    totalExpense,
    balance,
    transactions,
    categoriesMap,
    categoriesNames,
    handleTransactions,
  };
};
