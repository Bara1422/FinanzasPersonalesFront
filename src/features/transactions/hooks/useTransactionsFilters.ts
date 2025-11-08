import { useMemo, useState } from 'react';
import { useCategories } from '@/features/categories/hooks/useCategories';
import type { Transaction } from '@/mocks/transaccion.mock';

export const useTransactionsFilters = (transactions: Transaction[]) => {
  const { data: categories = [] } = useCategories();
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if(searchTerm.trim() !== '') {
      const search = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((transaction) =>
        transaction.descripcion.toLowerCase().includes(search)
      );
    }

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

    return [...filtered].sort((a, b) => b.fecha.localeCompare(a.fecha));
  }, [filterType, filterCategory, transactions, categories, searchTerm]);

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setFilterCategory('todas');
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  }

  return {
    filterType,
    setFilterType,
    filterCategory,
    searchTerm,
    setFilterCategory,
    filteredTransactions,
    handleFilterCategoryChange,
    handleSearchTermChange,
    handleFilterTypeChange,
  };
};
