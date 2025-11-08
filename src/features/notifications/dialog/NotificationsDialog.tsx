import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { FormDialogHeader } from '@/components/forms/FormHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useNotificationCreate } from '@/hooks/useNotifications';
import { notificationSchema } from '@/schemas/formNotification.schema';
import { NotificationsDialogBody } from './components/NotificationsDialogBody';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type NotificationsDialogFormData = z.infer<typeof notificationSchema>;

export const NotificationsDialog = ({ open, onOpenChange }: Props) => {
  const {
    data: categories,
    fetchStatus: fetchStatusCategories,
    error: errorCategories,
  } = useCategories();

  const { mutate: notificationMutate, isPending: isNotificationPending } =
    useNotificationCreate();

  const uniqueId = useId();

  const form = useForm<NotificationsDialogFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      descripcion: '',
      fecha_vencimiento: '',
      monto: 0,
      prioridad: 'MEDIA',
      id_categoria: 1,
    },
  });

  const onSubmit = async (data: NotificationsDialogFormData) => {
    notificationMutate(data, {
      onSuccess: () => {
        toast.success('Notificación creada con éxito');
        form.reset();
      },
      onError: () => {
        toast.error('Error al crear la notificación');
      },
    });

    onOpenChange(false);
  };

  if (fetchStatusCategories === 'fetching') {
    return <Spinner className="size-8" />;
  }

  if (errorCategories) {
    return <div>Error al cargar las categorías: {errorCategories.message}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <FormDialogHeader
          title="Nueva Notificación"
          description=" Registra un nuevo gasto pendiente o vencimiento programado."
        />
        <form
          id={`${uniqueId}-notifications-form`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <NotificationsDialogBody
            form={form}
            uniqueId={uniqueId}
            categories={categories ?? []}
          />

          <DialogFooter>
            <Button
              type="button"
              className="cursor-pointer"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                form.reset();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isNotificationPending}
            >
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
