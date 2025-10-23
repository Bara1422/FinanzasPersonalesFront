import { mockCategories } from '@/mocks/category.mock';
import { mockTransactions } from '@/mocks/transaccion.mock';

export interface CategorySummary {
  id_category: string;
  nombre: string;
  cantidad: number;
  totalPorCategoria: number;
  tipo: 'GASTO' | 'INGRESO';
}

export const getCategorySummaryMock = () => {
  const summary: CategorySummary[] = mockCategories.map((category) => {
    const categoryTransactions = mockTransactions.filter(
      (transaction) => transaction.id_categoria === category.id,
    );

    const cantidad = categoryTransactions.length;

    const totalPorCategoria = categoryTransactions.reduce(
      (acc, transaction) => {
        return acc + transaction.monto;
      },
      0,
    );
    return {
      id_category: category.id,
      nombre: category.nombre,
      cantidad,
      totalPorCategoria,
      tipo: categoryTransactions[0]?.tipo,
    };
  });

  return summary;
};
