import { CheckCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useNotificationMarkAsPaid } from '@/features/notifications/hooks/useNotifications';
import { Button } from '../../../components/ui/button';

interface Props {
  id_notificacion: number;
}

export const NotificationsButtons = ({
  id_notificacion,
}: Props) => {
  const { mutate: markAsPaidMutate, isPending: markAsPaidIsPending } =
    useNotificationMarkAsPaid();

  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleMarkAsPaid = (id_notificacion: number) => {
    setProcessingId(id_notificacion);
    markAsPaidMutate(id_notificacion, {
      onSuccess: () => {
        toast.success('Notificación marcada como pagada');
        setProcessingId(null);
      },
      onError: () => {
        toast.error('Error al marcar la notificación como pagada');
        setProcessingId(null);
      },
    });
  };

  if (markAsPaidIsPending && processingId === id_notificacion) {
    return (
      <div className="pt-2">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 pt-2">
      {/* TODO: cambiar estado en back y generar transaccion */}
      <Button
        variant="default"
        size="sm"
        className="h-8 px-3 text-xs cursor-pointer"
        onClick={() => handleMarkAsPaid(id_notificacion)}
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
