import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Category } from '@/mocks/category.mock';
import type { Transaction } from '@/mocks/transaccion.mock';
import { TransactionsTableBody } from './TransactionsTableBody';

interface Props {
  categoriesMap: { [k: string]: Category };
  transactions: Transaction[];
  visibleTransactions: Transaction[];
}

export const TransactionsTable = ({
  categoriesMap,
  transactions,
  visibleTransactions,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Transacciones</CardTitle>
        <CardDescription>
          {transactions.length} transacciones encontradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Fecha
                </Button>
              </TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="flex justify-end">
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Monto
                </Button>
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TransactionsTableBody
            categoriesMap={categoriesMap}
            visibleTransactions={visibleTransactions}
          />
        </Table>
      </CardContent>
    </Card>
  );
};
