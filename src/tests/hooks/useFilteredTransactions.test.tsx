import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useFilteredTransactions } from '@/features/transactions/hooks/useFilteredTransactions';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

vi.mock('@/features/categories/hooks/useCategories', () => ({
  useCategories: vi.fn(),
}));

vi.mock('@/features/transactions/hooks/useTransactions', () => ({
  useTransactions: vi.fn(),
}));

describe('useFilteredTransactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const categories = [
    { id_categoria: 1, nombre: 'Sueldo', tipo: 'INGRESO' },
    { id_categoria: 2, nombre: 'Comida', tipo: 'GASTO' },
  ];

  const transactions = [
    { id_transaccion: 10, id_categoria: 1, monto: 100 },
    { id_transaccion: 11, id_categoria: 2, monto: 50 },
    { id_transaccion: 12, id_categoria: 999, monto: 999 },
  ];

  it('filterType=todos y filterCategory=todas => devuelve todas las transacciones con categoría válida', () => {
    (useTransactions as any).mockReturnValue({
      data: transactions,
      isLoading: false,
      error: null,
    });

    (useCategories as any).mockReturnValue({
      data: categories,
    });

    const { result } = renderHook(() =>
      useFilteredTransactions({ filterType: 'todos', filterCategory: 'todas' }),
    );

    expect(result.current.data.map((t: any) => t.id_transaccion)).toEqual([
      10, 11,
    ]);
    expect(result.current.total).toBe(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('filterType=ingreso => devuelve solo transacciones de categorías INGRESO', () => {
    (useTransactions as any).mockReturnValue({
      data: transactions,
      isLoading: false,
      error: null,
    });

    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() =>
      useFilteredTransactions({
        filterType: 'ingreso',
        filterCategory: 'todas',
      }),
    );

    expect(result.current.data.map((t: any) => t.id_transaccion)).toEqual([10]);
    expect(result.current.total).toBe(1);
  });

  it('filterType=gasto => devuelve solo transacciones de categorías GASTO', () => {
    (useTransactions as any).mockReturnValue({
      data: transactions,
      isLoading: false,
      error: null,
    });

    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() =>
      useFilteredTransactions({ filterType: 'gasto', filterCategory: 'todas' }),
    );

    expect(result.current.data.map((t: any) => t.id_transaccion)).toEqual([11]);
    expect(result.current.total).toBe(1);
  });

  it('filterCategory=2 => devuelve solo transacciones con esa categoría', () => {
    (useTransactions as any).mockReturnValue({
      data: transactions,
      isLoading: false,
      error: null,
    });

    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() =>
      useFilteredTransactions({ filterType: 'todos', filterCategory: '2' }),
    );

    expect(result.current.data.map((t: any) => t.id_transaccion)).toEqual([11]);
    expect(result.current.total).toBe(1);
  });

  it('pasa isLoading y error desde useTransactions', () => {
    (useTransactions as any).mockReturnValue({
      data: [],
      isLoading: true,
      error: new Error('boom'),
    });

    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() =>
      useFilteredTransactions({ filterType: 'todos', filterCategory: 'todas' }),
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
