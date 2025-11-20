// src/features/transactions/hooks/useFilteredTransactions.ts
import { useMemo } from 'react';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useTransactions } from './useTransactions';

interface Props {
  filterType: string; // "todos" | "ingreso" | "gasto"
  filterCategory: string; // "todas" | id_categoria
}

export const useFilteredTransactions = ({
  filterType,
  filterCategory,
}: Props) => {
  const { data: transactionsData, isLoading, error } = useTransactions();
  const { data: categoriesData } = useCategories();

  const filtered = useMemo(() => {
    if (!transactionsData || !categoriesData) return [];

    return transactionsData.filter((t) => {
      const category = categoriesData.find(
        (cat) => cat.id_categoria === t.id_categoria,
      );
      if (!category) return false;

      const matchesType =
        filterType === 'todos' ||
        category.tipo.toLowerCase() === filterType.toLowerCase();

      const matchesCategory =
        filterCategory === 'todas' || t.id_categoria === Number(filterCategory);

      return matchesType && matchesCategory;
    });
  }, [transactionsData, categoriesData, filterType, filterCategory]);

  return {
    data: filtered,
    isLoading,
    error,
    total: filtered.length,
  };
};
