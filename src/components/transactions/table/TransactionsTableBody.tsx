import { EditDeleteButtons } from '@/components/common/EditDeletButtons';
import { Badge } from '@/components/ui/badge';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getAmountInfo } from '@/lib/getAmmountInfo';
import type { Category } from '@/mocks/category.mock';
import type { Transaction } from '@/mocks/transaccion.mock';

interface Props {
  categoriesMap: Record<string, Category>;
  visibleTransactions: Transaction[];
}

export const TransactionsTableBody = ({
  visibleTransactions,
  categoriesMap,
}: Props) => {
  const isIncome = (tipo: string) => tipo === 'INGRESO';

  return (
    <TableBody>
      {visibleTransactions.map((transaction) => {
        const { color, formattedAmount } = getAmountInfo({
          amount: transaction.monto,
          tipo: categoriesMap[transaction.id_categoria].tipo,
        });
        return (
          <TableRow key={transaction.id_transaccion}>
            <TableCell className="font-medium">
              {new Date(transaction.fecha).toLocaleDateString('es-ES')}
            </TableCell>
            <TableCell>{transaction.descripcion}</TableCell>
            <TableCell>
              <Badge
                variant={`${isIncome(categoriesMap[transaction.id_categoria]?.tipo) ? 'default' : 'secondary'}`}
              >
                {categoriesMap[transaction.id_categoria]?.nombre}
              </Badge>
            </TableCell>
            <TableCell>
              <span className={`${color} font-bold flex justify-end`}>
                {formattedAmount}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <EditDeleteButtons />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
