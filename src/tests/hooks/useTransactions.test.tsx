import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import {
  useTransactionById,
  useTransactionCreate,
  useTransactionDelete,
  useTransactions,
  useTransactionUpdate,
} from '@/features/transactions/hooks/useTransactions';
import { useAuthStore } from '@/store/authStore';
import type { Transaction } from '@/types/transaction.types';

vi.mock('@/config/axios', () => ({
  apiAxios: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

function makeWrapper(qc: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
  };
}

describe('transactions hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ usuario: { id_usuario: 10 } }),
    );
  });

  it('useTransactions: trae lista de transacciones', async () => {
    const mockTx: Transaction[] = [
      {
        id_transaccion: 1,
        id_usuario: 10,
        id_categoria: 2,
        monto: 100,
        descripcion: 'Comida',
        fecha: '2026-02-01T00:00:00.000Z',
      },
    ];

    (apiAxios.get as any).mockResolvedValue({ data: mockTx });

    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const { result } = renderHook(() => useTransactions(), {
      wrapper: makeWrapper(qc),
    });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(apiAxios.get).toHaveBeenCalledWith('/transacciones');
    expect(result.current.data).toEqual(mockTx);
  });

  it('useTransactionCreate: hace POST e invalida balance y transactions', async () => {
    (apiAxios.post as any).mockResolvedValue({});

    const qc = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries');

    const { result } = renderHook(() => useTransactionCreate(), {
      wrapper: makeWrapper(qc),
    });

    await result.current.mutateAsync({
      id_categoria: 3,
      monto: 200,
      descripcion: 'Sueldo',
    });

    expect(apiAxios.post).toHaveBeenCalledWith(
      '/transacciones',
      expect.objectContaining({
        id_categoria: 3,
        monto: 200,
        descripcion: 'Sueldo',
        fecha: expect.any(String),
      }),
    );

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['balance', 10] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['transactions'] });
  });

  it('useTransactionDelete: hace DELETE e invalida balance y transactions', async () => {
    (apiAxios.delete as any).mockResolvedValue({});

    const qc = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries');

    const { result } = renderHook(() => useTransactionDelete(), {
      wrapper: makeWrapper(qc),
    });

    await result.current.mutateAsync(99);

    expect(apiAxios.delete).toHaveBeenCalledWith('/transacciones/99');
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['balance', 10] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['transactions'] });
  });

  it('useTransactionUpdate: hace PATCH e invalida balance y transactions', async () => {
    (apiAxios.patch as any).mockResolvedValue({});

    const qc = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries');

    const { result } = renderHook(() => useTransactionUpdate(), {
      wrapper: makeWrapper(qc),
    });

    await result.current.mutateAsync({
      id_transaccion: 5,
      monto: 999,
    });

    expect(apiAxios.patch).toHaveBeenCalledWith('/transacciones/5', {
      id_transaccion: 5,
      monto: 999,
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['balance', 10] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['transactions'] });
  });

  it('useTransactionById: si no hay cache, llama /transacciones/:id', async () => {
    const tx: Transaction = {
      id_transaccion: 8,
      id_usuario: 10,
      id_categoria: 1,
      monto: 222,
      descripcion: 'Otra',
      fecha: '2026-02-02T00:00:00.000Z',
    };

    (apiAxios.get as any).mockResolvedValue({ data: tx });

    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const { result } = renderHook(() => useTransactionById(8), {
      wrapper: makeWrapper(qc),
    });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(apiAxios.get).toHaveBeenCalledWith('/transacciones/8');
    expect(result.current.data).toEqual(tx);
  });

  it('useTransactionById: si id es undefined, termina en error', async () => {
    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const { result } = renderHook(() => useTransactionById(undefined), {
      wrapper: makeWrapper(qc),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
