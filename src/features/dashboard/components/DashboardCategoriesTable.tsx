import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useBalance } from '@/hooks/useBalance';

export const DashboardCategoriesTable = () => {
  const {
    data: balance,
    status: statusBalance,
    error: errorBalance,
  } = useBalance();
  const {
    data: categorias,
    status: statusCategorias,
    error: errorCategorias,
  } = useCategories();

  if (statusBalance === 'pending' || statusCategorias === 'pending') {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución del mes actual</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (
    statusBalance === 'error' ||
    statusCategorias === 'error' ||
    errorBalance ||
    errorCategorias
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

  if (!balance || !categorias || categorias.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución del mes actual</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Gastos por Categoría</CardTitle>
        <CardDescription>Distribución del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {balance.transacciones.map((transaccion) => {
          const categoryInfo = categorias.find(
            (cat) => cat.id_categoria === transaccion.id_categoria,
          );
          if (!categoryInfo) return null;
          return (
            <div key={transaccion.id_categoria} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{categoryInfo.nombre}</span>
                <span className="text-destructive font-semibold">
                  ${transaccion.monto.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
