import { EditDeleteButtons } from '@/components/common/EditDeletButtons';
import { Badge } from '@/components/ui/badge';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { getAmountInfo } from '@/lib/getAmmountInfo';
import type { Transaction } from '@/mocks/transaccion.mock';
import {
  useTransactionDelete,
  useTransactions,
} from '../hooks/useTransactions';

interface Props {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
}

export const TransactionsTableBody = ({ onEdit }: Props) => {
  const { data: transactionsData, error: transactionsError } =
    useTransactions();

  const { data: categoriesData, error: categoriesError } = useCategories();
  const { mutate: deleteTransaction } = useTransactionDelete();

  const handleDelete = (transactionId: number) => {
    deleteTransaction(transactionId);
  };

  if (categoriesError || transactionsError) {
    return <div>Error loading categories</div>;
  }

  const isIncome = (tipo: string) => tipo === 'INGRESO';
  console.log();
  return (
    <TableBody>
      {transactionsData?.map((transaction) => {
        const category = categoriesData?.find(
          (cat) => cat.id_categoria === transaction.id_categoria,
        );
        const { color, formattedAmount } = getAmountInfo({
          amount: transaction.monto,
          tipo: category?.tipo || 'INGRESO',
        });
        return (
          <TableRow key={transaction.id_transaccion}>
            <TableCell className="font-medium">
              {new Date(transaction.fecha).toLocaleDateString('es-ES')}
            </TableCell>
            <TableCell>{transaction.descripcion}</TableCell>
            <TableCell>
              <Badge
                variant={
                  category && isIncome(category.tipo) ? 'default' : 'secondary'
                }
              >
                {category?.nombre}
              </Badge>
            </TableCell>
            <TableCell>
              <span className={`${color} font-bold flex justify-end`}>
                {formattedAmount}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <EditDeleteButtons
                transaction={transaction}
                onDelete={handleDelete}
                onEdit={onEdit}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
