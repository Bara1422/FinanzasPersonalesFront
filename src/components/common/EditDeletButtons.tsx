import { Edit, Trash2 } from 'lucide-react';
import type { Transaction } from '@/types/transaction.types';
import { Button } from '../ui/button';

interface Props {
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
  transaction: Transaction;
}

export const EditDeleteButtons = ({ onEdit, transaction, onDelete }: Props) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer hover:bg-accent-foreground/10"
        onClick={() => onEdit(transaction)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer hover:bg-accent-foreground/10"
        onClick={() => onDelete(transaction.id_transaccion)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
