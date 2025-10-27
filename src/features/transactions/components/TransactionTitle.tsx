import { Plus } from 'lucide-react';
import { PageTitle } from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';

interface Props {
  handleOpenDialog: (open: boolean) => void;
}

export const TransactionTitle = ({ handleOpenDialog }: Props) => {
  return (
    <div className="flex justify-between items-end">
      {/* Title */}
      <PageTitle
        title="Transacciones"
        subtitle="Gestiona todos tus ingresos y gastos"
      />
      <Button
        variant="default"
        type="button"
        className="cursor-pointer"
        onClick={() => handleOpenDialog(true)}
      >
        <Plus className="h-4 w-4" />
        Nueva Transacción
      </Button>
    </div>
  );
};
