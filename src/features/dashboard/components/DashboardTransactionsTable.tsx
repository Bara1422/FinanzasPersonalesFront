import { EmptyDataCard } from '@/components/common/EmptyDataCard';
import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useBalance } from '@/hooks/useBalance';
import { getAmountInfo } from '@/lib/getAmmountInfo';

export const DashboardTransactionsTable = () => {
  const { data: transactions, status: transactionsStatus } = useBalance();
  const isIncome = (tipo: string) => tipo === 'INGRESO';
  // const { data: transactions, status: transactionsStatus } = useTransactions();
  const { data: categories, status: categoriesStatus } = useCategories();

  if (transactionsStatus === 'pending' || categoriesStatus === 'pending') {
    return <Skeleton className="h-64 w-full" />;
  }

  if (transactionsStatus === 'error' || categoriesStatus === 'error') {
    return (
      <Card>
        <CardHeaderCustom
          title="Transacciones Recientes"
          description="Últimas 5 transacciones"
        />
        <CardContent>
          <p className="text-center text-red-600 py-8">
            Error al cargar las transacciones
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!transactions?.transacciones.length) {
    return (
      <EmptyDataCard
        title="Transacciones Recientes"
        description="Últimas 5 transacciones"
        text="No hay transacciones para mostrar"
      />
    );
  }

  const transactionsSorted = [...transactions.transacciones].sort((a, b) =>
    b.fecha.localeCompare(a.fecha),
  );

  return (
    <Card>
      <CardHeaderCustom
        title="Transacciones Recientes"
        description="Últimas 5 transacciones"
      />
      <CardContent>
        <Table>
          {/* Headers */}
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {transactionsSorted.slice(0, 5).map((transaction) => {
              const category = categories?.find(
                (cat) => cat.id_categoria === transaction.id_categoria,
              );
              const { color, formattedAmount } = getAmountInfo({
                amount: transaction.monto,
                tipo: category?.tipo ?? 'GASTO',
              });
              return (
                <TableRow key={transaction.id_transaccion}>
                  <TableCell className="font-medium">
                    {new Date(transaction.fecha).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>{transaction.descripcion}</TableCell>
                  <TableCell>
                    <Badge
                      variant={`${isIncome(category?.tipo ?? 'GASTO') ? 'default' : 'secondary'}`}
                    >
                      {category?.nombre}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`${color} font-bold flex justify-end`}>
                      {formattedAmount}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
