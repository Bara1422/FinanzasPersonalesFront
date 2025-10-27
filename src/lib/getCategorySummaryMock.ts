import { mockCategories } from '@/mocks/category.mock';
import { mockTransactions } from '@/mocks/transaccion.mock';

export interface CategorySummary {
  id_category: number;
  nombre: string;
  cantidad: number;
  totalPorCategoria: number;
  tipo: 'GASTO' | 'INGRESO';
}

export const getCategorySummaryMock = (id_usuario: number) => {
  const userTransactions = mockTransactions.filter(
    (transaction) => transaction.id_usuario === id_usuario,
  );

  const summary: CategorySummary[] = mockCategories.map((category) => {
    const categoryTransactions = userTransactions.filter(
      (transaction) => transaction.id_categoria === category.id_categoria,
    );

    const cantidad = categoryTransactions.length;

    const totalPorCategoria = categoryTransactions.reduce(
      (acc, transaction) => {
        return acc + transaction.monto;
      },
      0,
    );
    return {
      id_category: category.id_categoria,
      nombre: category.nombre,
      cantidad,
      totalPorCategoria,
      tipo: category.tipo,
    };
  });

  const summaryFiltered = summary.filter((item) => item.cantidad > 0);

  return summaryFiltered;
};
