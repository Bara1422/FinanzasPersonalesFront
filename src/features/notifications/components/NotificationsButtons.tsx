import { CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const NotificationsButtons = () => {
  return (
    <div className="flex items-center gap-2 pt-2">
      {/* TODO: cambiar estado en back y generar transaccion */}
      <Button variant="default" size="sm" className="h-8 px-3 text-xs cursor-pointer">
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
