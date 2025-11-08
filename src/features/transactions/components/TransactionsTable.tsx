import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Transaction } from '@/mocks/transaccion.mock';
import { TransactionsTableBody } from './TransactionsTableBody';

interface Props {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
}

export const TransactionsTable = ({
  open,
  handleOpenDialog,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Card>
      <CardHeaderCustom
        title="Lista de Transacciones"
        description={`${1} transacciones encontradas`}
      />
      <CardContent>
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
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
            open={open}
            handleOpenDialog={handleOpenDialog}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Table>
      </CardContent>
    </Card>
  );
};
