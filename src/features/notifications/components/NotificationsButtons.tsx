import { CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface Props {
  markAsPaid: (id_notificacion: number) => void;
  id_notificacion: number;
}

export const NotificationsButtons = ({
  markAsPaid,
  id_notificacion,
}: Props) => {
  return (
    <div className="flex items-center gap-2 pt-2">
      {/* TODO: cambiar estado en back y generar transaccion */}
      <Button
        variant="default"
        size="sm"
        className="h-8 px-3 text-xs cursor-pointer"
        onClick={() => markAsPaid(id_notificacion)}
      >
        <CheckCircle className="mr-1 h-3 w-3" />
        Marcar como pagado
      </Button>
      {/* TODO: eliminar en el back */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-3 text-xs text-destructive hover:text-white hover:bg-destructive/80 cursor-pointer"
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Eliminar
      </Button>
    </div>
  );
};
