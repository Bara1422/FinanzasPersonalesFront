import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import type { CategoryData } from '../types/categories.type';

export const useCategories = () => {
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiAxios.get<CategoryData[]>('/categorias');
      return response.data;
    },
  });

  return { data: data ?? [], isLoading, error, status, fetchStatus };
};
