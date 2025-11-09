import { EmptyDataCard } from '@/components/common/EmptyDataCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useBalance } from '@/hooks/useBalance';
import { getCategorySummary } from '@/lib/getCategorySummary';

export const DashboardCategoriesTable = () => {
  const {
    data: balance,
    status: statusBalance,
    error: errorBalance,
  } = useBalance();

    const categorySummary = getCategorySummary();
  if (statusBalance === 'pending') {
    return <Spinner className="size-8" />;
  }

  if (
    statusBalance === 'error' ||
    errorBalance
  ) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución del mes actual</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-red-600 py-8">
            Error al cargar las categorías
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!balance || categorySummary.length === 0) {
    return (
      <EmptyDataCard
        title="Gastos por Categoría"
        description="Distribución de gastos"
        text="No hay gastos registrados"
      />
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Gastos o Ingresos por Categoría</CardTitle>
        <CardDescription>Distribución del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categorySummary.map((transaccion) => {
          const categoryInfo = categorySummary.find(
            (cat) => cat.id_categoria === transaccion.id_categoria,
          );
          if (!categoryInfo) return null;
          return (
            <div key={transaccion.id_categoria} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{categoryInfo.nombre}</span>
                <span className={`${categoryInfo.tipo === 'GASTO' ? 'text-destructive' : 'text-green-500'} font-semibold`}>
                  ${transaccion.totalPorCategoria.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
