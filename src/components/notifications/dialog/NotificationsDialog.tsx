import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formDateForInput } from '@/lib/formDateForInput';
import { sleep } from '@/lib/sleep';
import type { Category } from '@/mocks/category.mock';
import type { Notification } from '@/mocks/notification.mock';
import { notificationSchema } from '@/schemas/formNotification.schema';
import { NotificationsDialogField } from './NotificationsDialogField';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  filteredNotifications: Notification[];
}

export type NotificationsDialogFormData = z.infer<typeof notificationSchema>;

export const NotificationsDialog = ({
  open,
  onOpenChange,
  categories,
  filteredNotifications,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

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
    console.log('Transaccion', newNotification);
    filteredNotifications.push(newNotification);
    setIsLoading(false);
    console.log(filteredNotifications);
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

  const categoriesFiltered = categories.filter(
    (category) => category.tipo === 'GASTO',
  );

  const Priorities = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Media', value: 'MEDIA' },
    { label: 'Baja', value: 'BAJA' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Notificación</DialogTitle>
          <DialogDescription>
            Registra un nuevo gasto pendiente o vencimiento programado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {/* Message */}
                <NotificationsDialogField
                  form={form}
                  name="mensaje"
                  label="Mensaje"
                  placeholder="Ej: Pago de alquiler, Cuota del gimnasio..."
                />

                {/* Amount */}
                <NotificationsDialogField
                  form={form}
                  name="monto"
                  label="Monto"
                  type="number"
                  placeholder="1200"
                />

                {/* TODO: Hacer reutilizables los select */}
                {/* Category */}
                <FormField
                  control={form.control}
                  name="id_categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                        defaultValue={categoriesFiltered[0]?.id_categoria.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesFiltered.map((category) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={category.id_categoria}
                              value={category.id_categoria.toString()}
                            >
                              {category.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priority */}
                <FormField
                  control={form.control}
                  name="prioridad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioridad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una prioridad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Priorities.map((priority) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={priority.value}
                              value={priority.value}
                            >
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expiration date */}
                <NotificationsDialogField
                  form={form}
                  min={formDateForInput(new Date().toISOString())}
                  name="fecha_vencimiento"
                  label="Fecha de Vencimiento"
                  type="date"
                />
              </div>
            </div>

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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
