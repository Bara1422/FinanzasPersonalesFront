import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useTransactionsFilters } from '@/features/transactions/hooks/useTransactionsFilters';
import type { Transaction } from '@/types/transaction.types';

vi.mock('@/features/categories/hooks/useCategories', () => ({
  useCategories: vi.fn(),
}));

describe('useTransactionsFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const categories = [
    { id_categoria: 1, nombre: 'Sueldo', tipo: 'INGRESO' },
    { id_categoria: 2, nombre: 'Comida', tipo: 'GASTO' },
  ];

  const transactions: Transaction[] = [
    {
      id_transaccion: 1,
      id_usuario: 10,
      id_categoria: 2,
      monto: 100,
      descripcion: 'Comida del viernes',
      fecha: '2026-02-01T10:00:00.000Z',
    },
    {
      id_transaccion: 2,
      id_usuario: 10,
      id_categoria: 1,
      monto: 200,
      descripcion: 'Sueldo Enero',
      fecha: '2026-02-02T10:00:00.000Z',
    },
    {
      id_transaccion: 3,
      id_usuario: 10,
      id_categoria: 2,
      monto: 50,
      descripcion: 'Comida del sabado',
      fecha: '2026-01-30T10:00:00.000Z',
    },
  ];

  it('ordena por fecha descendente (más nueva primero)', () => {
    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() => useTransactionsFilters(transactions));

    expect(
      result.current.filteredTransactions.map((t) => t.id_transaccion),
    ).toEqual([2, 1, 3]);
  });

  it('filtra por búsqueda (searchTerm) en descripcion', () => {
    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() => useTransactionsFilters(transactions));

    act(() => {
      result.current.handleSearchTermChange('sueldo');
    });

    expect(
      result.current.filteredTransactions.map((t) => t.id_transaccion),
    ).toEqual([2]);
  });

  it('filtra por tipo (filterType) usando categorías', () => {
    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() => useTransactionsFilters(transactions));

    act(() => {
      result.current.handleFilterTypeChange('gasto');
    });

    expect(
      result.current.filteredTransactions.map((t) => t.id_transaccion),
    ).toEqual([1, 3]);
  });

  it('filtra por categoría (filterCategory)', () => {
    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() => useTransactionsFilters(transactions));

    act(() => {
      result.current.handleFilterCategoryChange('1');
    });

    expect(
      result.current.filteredTransactions.map((t) => t.id_transaccion),
    ).toEqual([2]);
  });

  it('cuando cambia filterType, resetea filterCategory a "todas"', () => {
    (useCategories as any).mockReturnValue({ data: categories });

    const { result } = renderHook(() => useTransactionsFilters(transactions));

    act(() => {
      result.current.handleFilterCategoryChange('2');
    });
    expect(result.current.filterCategory).toBe('2');

    act(() => {
      result.current.handleFilterTypeChange('ingreso');
    });

    expect(result.current.filterCategory).toBe('todas');
    expect(result.current.filterType).toBe('ingreso');
  });
});
