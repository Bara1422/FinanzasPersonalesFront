import { describe, expect, it, vi } from 'vitest';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { getCategorySummary } from '../../lib/getCategorySummary';

vi.mock('@/features/categories/hooks/useCategories');
vi.mock('@/features/transactions/hooks/useTransactions');

describe('getCategorySummary', () => {
  it('debe retornar array vacío si está cargando transacciones', () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: undefined,
      fetchStatus: 'fetching',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: [],
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toEqual([]);
  });

  it('debe retornar array vacío si está cargando categorías', () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: [],
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: undefined,
      fetchStatus: 'fetching',
    } as any);

    const result = getCategorySummary();

    expect(result).toEqual([]);
  });

  it('debe retornar array vacío si no hay transacciones', () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: undefined,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: [],
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toEqual([]);
  });

  it('debe retornar array vacío si no hay categorías', () => {
    vi.mocked(useTransactions).mockReturnValue({
      data: [],
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: undefined,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toEqual([]);
  });

  it('debe calcular correctamente el resumen por categoría', () => {
    const mockCategorias = [
      { id_categoria: 1, nombre: 'Comida', tipo: 'GASTO' as const },
      { id_categoria: 2, nombre: 'Transporte', tipo: 'GASTO' as const },
      { id_categoria: 3, nombre: 'Salario', tipo: 'INGRESO' as const },
    ];

    const mockTransacciones = [
      { id_categoria: 1, monto: 100 },
      { id_categoria: 1, monto: 200 },
      { id_categoria: 2, monto: 50 },
      { id_categoria: 3, monto: 1000 },
      { id_categoria: 3, monto: 500 },
    ];

    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransacciones,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategorias,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      id_categoria: 1,
      nombre: 'Comida',
      cantidad: 2,
      totalPorCategoria: 300,
      tipo: 'GASTO',
    });
    expect(result[1]).toEqual({
      id_categoria: 2,
      nombre: 'Transporte',
      cantidad: 1,
      totalPorCategoria: 50,
      tipo: 'GASTO',
    });
    expect(result[2]).toEqual({
      id_categoria: 3,
      nombre: 'Salario',
      cantidad: 2,
      totalPorCategoria: 1500,
      tipo: 'INGRESO',
    });
  });

  it('debe filtrar categorías sin transacciones', () => {
    const mockCategorias = [
      { id_categoria: 1, nombre: 'Comida', tipo: 'GASTO' as const },
      { id_categoria: 2, nombre: 'Transporte', tipo: 'GASTO' as const },
      { id_categoria: 3, nombre: 'Entretenimiento', tipo: 'GASTO' as const },
    ];

    const mockTransacciones = [
      { id_categoria: 1, monto: 100 },
      { id_categoria: 1, monto: 200 },
    ];

    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransacciones,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategorias,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toHaveLength(1);
    expect(result[0].id_categoria).toBe(1);
    expect(result[0].nombre).toBe('Comida');
  });

  it('debe manejar categorías con una sola transacción', () => {
    const mockCategorias = [
      { id_categoria: 1, nombre: 'Servicios', tipo: 'GASTO' as const },
    ];

    const mockTransacciones = [{ id_categoria: 1, monto: 500 }];

    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransacciones,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategorias,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id_categoria: 1,
      nombre: 'Servicios',
      cantidad: 1,
      totalPorCategoria: 500,
      tipo: 'GASTO',
    });
  });

  it('debe sumar correctamente montos decimales', () => {
    const mockCategorias = [
      { id_categoria: 1, nombre: 'Comida', tipo: 'GASTO' as const },
    ];

    const mockTransacciones = [
      { id_categoria: 1, monto: 10.5 },
      { id_categoria: 1, monto: 20.75 },
      { id_categoria: 1, monto: 15.25 },
    ];

    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransacciones,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategorias,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toHaveLength(1);
    expect(result[0].cantidad).toBe(3);
    expect(result[0].totalPorCategoria).toBe(46.5);
  });

  it('debe retornar array vacío cuando hay categorías pero sin transacciones', () => {
    const mockCategorias = [
      { id_categoria: 1, nombre: 'Comida', tipo: 'GASTO' as const },
      { id_categoria: 2, nombre: 'Transporte', tipo: 'GASTO' as const },
    ];

    const mockTransacciones: [] = [];

    vi.mocked(useTransactions).mockReturnValue({
      data: mockTransacciones,
      fetchStatus: 'idle',
    } as any);
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategorias,
      fetchStatus: 'idle',
    } as any);

    const result = getCategorySummary();

    expect(result).toEqual([]);
  });
});
