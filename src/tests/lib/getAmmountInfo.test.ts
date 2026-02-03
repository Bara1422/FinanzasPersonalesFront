import { describe, expect, it } from 'vitest';
import { getAmountInfo } from '../../lib/getAmmountInfo';

describe('getAmountInfo', () => {
  describe('INGRESO', () => {
    it('debe retornar color verde y monto formateado con símbolo $', () => {
      const result = getAmountInfo({ amount: 1000, tipo: 'INGRESO' });

      expect(result.color).toBe('text-green-500');
      expect(result.formattedAmount).toBe('$1,000');
    });

    it('debe formatear correctamente montos grandes', () => {
      const result = getAmountInfo({ amount: 1000000, tipo: 'INGRESO' });

      expect(result.color).toBe('text-green-500');
      expect(result.formattedAmount).toBe('$1,000,000');
    });

    it('debe manejar montos decimales', () => {
      const result = getAmountInfo({ amount: 1234.56, tipo: 'INGRESO' });

      expect(result.color).toBe('text-green-500');
      expect(result.formattedAmount).toContain('1,234');
    });
  });

  describe('GASTO', () => {
    it('debe retornar color rojo y monto formateado con símbolo $', () => {
      const result = getAmountInfo({ amount: 500, tipo: 'GASTO' });

      expect(result.color).toBe('text-red-500');
      expect(result.formattedAmount).toBe('$500');
    });

    it('debe formatear correctamente montos con separador de miles', () => {
      const result = getAmountInfo({ amount: 2500, tipo: 'GASTO' });

      expect(result.color).toBe('text-red-500');
      expect(result.formattedAmount).toBe('$2,500');
    });
  });

  describe('BALANCE', () => {
    it('debe retornar color verde para balance positivo', () => {
      const result = getAmountInfo({ amount: 1000, tipo: 'BALANCE' });

      expect(result.color).toBe('text-green-500');
      expect(result.formattedAmount).toBe('$1,000');
    });

    it('debe retornar color rojo para balance negativo', () => {
      const result = getAmountInfo({ amount: -500, tipo: 'BALANCE' });

      expect(result.color).toBe('text-red-500');
      expect(result.formattedAmount).toBe('$500');
    });

    it('debe retornar color verde para balance cero', () => {
      const result = getAmountInfo({ amount: 0, tipo: 'BALANCE' });

      expect(result.color).toBe('text-green-500');
      expect(result.formattedAmount).toBe('$0');
    });

    it('debe usar valor absoluto para balance negativo', () => {
      const result = getAmountInfo({ amount: -1234, tipo: 'BALANCE' });

      expect(result.color).toBe('text-red-500');
      expect(result.formattedAmount).toBe('$1,234');
    });
  });

  describe('TRANSACCION', () => {
    it('debe retornar color negro y monto sin símbolo $', () => {
      const result = getAmountInfo({ amount: 750, tipo: 'TRANSACCION' });

      expect(result.color).toBe('text-black-500');
      expect(result.formattedAmount).toBe('750');
    });

    it('debe formatear correctamente montos con separador de miles', () => {
      const result = getAmountInfo({ amount: 3500, tipo: 'TRANSACCION' });

      expect(result.color).toBe('text-black-500');
      expect(result.formattedAmount).toBe('3,500');
    });
  });
});
