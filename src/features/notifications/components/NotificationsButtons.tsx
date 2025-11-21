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

  const isActivated = processingId === notificacion.id_notificacion;

  return (
    <div className="flex items-center gap-2 pt-2">
      <Button
        variant="default"
        size="sm"
        className="h-8 px-3 text-xs cursor-pointer"
        onClick={() => handleMarkAsPaid(notificacion)}
        disabled={isActivated}
      >
        {isActivated && markAsPaidIsPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <CheckCircle className="h-4 w-4" />
        )}
        Marcar como pagado
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-3 text-xs text-destructive hover:text-white hover:bg-destructive/80 cursor-pointer"
        onClick={() => handleDelete(notificacion.id_notificacion)}
        disabled={isActivated}
      >
        {isActivated && deleteIsPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Eliminar
      </Button>
    </div>
  );
};
