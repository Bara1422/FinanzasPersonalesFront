import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { FormDialogHeader } from '@/components/forms/FormHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { sleep } from '@/lib/sleep';
import type { Category } from '@/mocks/category.mock';
import type { Notification } from '@/mocks/notification.mock';
import { notificationSchema } from '@/schemas/formNotification.schema';
import { NotificationsDialogBody } from './components/NotificationsDialogBody';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  addNotification: (notification: Notification) => void;
  filteredNotifications: Notification[];
}

export type NotificationsDialogFormData = z.infer<typeof notificationSchema>;

export const NotificationsDialog = ({
  open,
  onOpenChange,
  categories,
  filteredNotifications,
  addNotification,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const uniqueId = useId();

  const onSubmit = async (data: NotificationsDialogFormData) => {
    setIsLoading(true);
    await sleep(500);

    toast.success('Transacción creada con éxito');
    const newNotification: Notification = {
      ...data,
      id_notificacion: Math.floor(Math.random() * 10000),
      id_usuario: 1,
      pagado: false,
    };
  
    addNotification(newNotification);
    setIsLoading(false);

    onOpenChange(false);
    form.reset();
  };

  const form = useForm<NotificationsDialogFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      mensaje: '',
      fecha_vencimiento: '',
      monto: 0,
      prioridad: 'MEDIA',
      id_categoria: 1,
    },
  });

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
            categories={categories}
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
            {/* TODO: pegar a la api */}
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
