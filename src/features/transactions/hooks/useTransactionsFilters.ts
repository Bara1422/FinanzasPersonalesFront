import { useMemo, useState } from 'react';
import type { Category } from '@/mocks/category.mock';
import type { Transaction } from '@/mocks/transaccion.mock';

type Props = {
  transactions: Transaction[];
  categoriesMap: Record<string, Category>;
};

export const useTransactionsFilters = ({
  transactions,
  categoriesMap,
}: Props) => {
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todas');

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setFilterCategory('todas');
  };

  const visibleTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterType !== 'todos') {
      filtered = filtered.filter(
        (transaction) =>
          categoriesMap[transaction.id_categoria].tipo ===
          filterType.toUpperCase(),
      );
    }
    if (filterCategory !== 'todas') {
      filtered = filtered.filter(
        (transaction) => transaction.id_categoria.toString() === filterCategory,
      );
    }

    return filtered.sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 5);
  }, [transactions, filterType, filterCategory, categoriesMap]);

  return {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    visibleTransactions,
    handleFilterCategoryChange,
    handleFilterTypeChange,
  };
};
