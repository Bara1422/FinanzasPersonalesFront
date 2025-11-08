import { CheckCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import {
  useNotificationDelete,
  useNotificationMarkAsPaid,
} from '@/features/notifications/hooks/useNotifications';
import type { Notification } from '@/types/notification.type';
import { Button } from '../../../components/ui/button';

interface Props {
  notificacion: Notification;
}

export const NotificationsButtons = ({ notificacion }: Props) => {
  const { mutate: markAsPaidMutate, isPending: markAsPaidIsPending } =
    useNotificationMarkAsPaid();
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useNotificationDelete();

  const [processingId, setProcessingId] = useState<number | null>(null);
  const isPending = markAsPaidIsPending || deleteIsPending;

  const handleMarkAsPaid = (notificacion: Notification) => {
    setProcessingId(notificacion.id_notificacion);
    markAsPaidMutate(notificacion, {
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

  const handleDelete = (id_notificacion: number) => {
    setProcessingId(id_notificacion);
    deleteMutate(id_notificacion, {
      onSuccess: () => {
        toast.success('Notificación eliminada');
        setProcessingId(null);
      },
      onError: () => {
        toast.error('Error al eliminar la notificación');
        setProcessingId(null);
      },
    });
  };

  if (markAsPaidIsPending && processingId === notificacion.id_notificacion) {
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
        onClick={() => handleMarkAsPaid(notificacion)}
        disabled={isPending}
      >
        <CheckCircle className="mr-1 h-3 w-3" />
        Marcar como pagado
      </Button>
      {/* TODO: eliminar en el back */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-3 text-xs text-destructive hover:text-white hover:bg-destructive/80 cursor-pointer"
        onClick={() => handleDelete(notificacion.id_notificacion)}
        disabled={isPending}
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Eliminar
      </Button>
    </div>
  );
};
