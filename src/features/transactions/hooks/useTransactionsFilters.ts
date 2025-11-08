import { useMemo, useState } from 'react';
import { useCategories } from '@/features/categories/hooks/useCategories';
import type { Transaction } from '@/mocks/transaccion.mock';

type Props = {
  transactions: Transaction[];
};

export const useTransactionsFilters = ({ transactions }: Props) => {
  const { data: categories } = useCategories();
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todas');

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setFilterCategory('todas');
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterType !== 'todos') {
      filtered = filtered.filter((transaction) => {
        const category = categories.find(
          (cat) => cat.id_categoria === transaction.id_categoria,
        );
        return category && category.tipo === filterType.toUpperCase();
      });
    }
    if (filterCategory !== 'todas') {
      filtered = filtered.filter(
        (transaction) => transaction.id_categoria.toString() === filterCategory,
      );
    }

    return filtered.sort((a, b) => b.fecha.localeCompare(a.fecha));
  }, [transactions, categories, filterType, filterCategory]);

  return {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    filteredTransactions,
    handleFilterCategoryChange,
    handleFilterTypeChange,
  };
};
