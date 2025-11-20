import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';
import type { Category } from '@/types/category.types';

export const useCategories = () => {
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiAxios.get<Category[]>('/categorias');
      return response.data;
    },
  });

  return { data: data ?? [], isLoading, error, status, fetchStatus };
};
