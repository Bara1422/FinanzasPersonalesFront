import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import type { BalanceData } from '@/types/balance.types';
import { useBalance } from '../../hooks/useBalance';

vi.mock('@/config/axios', () => ({
  apiAxios: { get: vi.fn() },
}));

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
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

describe('useBalance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('si hay usuario, llama al endpoint y devuelve data', async () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: any) => selector({ usuario: { id_usuario: 123 } }),
    );

    const fakeData = {
      resumenTotal: { ingresos: 1000, gastos: 500, balance: 500 },
      resumenMensual: { ingresos: 200, gastos: 100, balance: 100 },
      cantidadTransacciones: 10,
      transacciones: [],
    } as BalanceData;

    (apiAxios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: fakeData,
    });

    const { result } = renderHook(() => useBalance(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(apiAxios.get).toHaveBeenCalledWith('/transacciones/resumen');
    expect(result.current.data).toEqual(fakeData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('si NO hay usuario, no hace la request (enabled false)', async () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: any) => selector({ usuario: null }),
    );

    const { result } = renderHook(() => useBalance(), { wrapper });

    expect(apiAxios.get).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });
});
