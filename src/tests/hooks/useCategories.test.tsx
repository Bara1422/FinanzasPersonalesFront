import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import { useCategories } from '../../features/categories/hooks/useCategories';

vi.mock('@/config/axios', () => ({
  apiAxios: { get: vi.fn() },
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cuando responde OK, devuelve las categorias', async () => {
    const mockCategories = [
      { id_categoria: 1, nombre: 'Sueldo', tipo: 'INGRESO' },
      { id_categoria: 2, nombre: 'Comida', tipo: 'GASTO' },
    ] as const;

    (apiAxios.get as any).mockResolvedValue({ data: mockCategories });

    const { result } = renderHook(() => useCategories(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(apiAxios.get).toHaveBeenCalledWith('/categorias');
    expect(result.current.data).toEqual(mockCategories);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('mientras carga, isLoading es true', () => {
    (apiAxios.get as any).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useCategories(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it('si falla, status error y data es []', async () => {
    (apiAxios.get as any).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useCategories(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});
