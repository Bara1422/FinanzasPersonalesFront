import { useCategories } from '@/features/categories/hooks/useCategories';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';

export interface CategorySummary {
  id_category: number;
  nombre: string;
  cantidad: number;
  totalPorCategoria: number;
  tipo: 'GASTO' | 'INGRESO';
}

export const getCategorySummaryMock = () => {
  const { data: transacciones, fetchStatus: transaccionesStatus } =
    useTransactions();
  const { data: categorias, fetchStatus: categoriasStatus } = useCategories();

  if (transaccionesStatus === 'fetching' || categoriasStatus === 'fetching') {
    return [];
  }

  if (!transacciones || !categorias) {
    return [];
  }

  const summary: CategorySummary[] = categorias.map((category) => {
    const categoryTransactions = transacciones?.filter(
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
