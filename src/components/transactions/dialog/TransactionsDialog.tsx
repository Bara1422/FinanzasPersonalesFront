import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { getAllCategories } from '@/lib/getAllCategories';
import { sleep } from '@/lib/sleep';
import { formNewTransactionSchema } from '@/schemas/formNewTransaction.schema';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { TransactionsFormField } from './TransactionsFormField';
import { TransactionsTypeFormField } from './TransactionsTypeFormField';

interface Props {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
}

export type TransactionsDialogFormData = z.infer<
  typeof formNewTransactionSchema
>;

export const TransactionsDialog = ({ open, handleOpenDialog }: Props) => {
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TransactionsDialogFormData) => {
    setIsLoading(true);
    await sleep(500);

    toast.success('Transacción creada con éxito');
    console.log('Transaccion', data);

    setIsLoading(false);
    handleOpenDialog(false);
    form.reset();
  };

  const form = useForm<TransactionsDialogFormData>({
    resolver: zodResolver(formNewTransactionSchema),
    defaultValues: {
      descripcion: '',
      monto: 0,
      categoria: '',
      tipo: 'ingreso',
    },
  });

  const watchType = form.watch('tipo');

  const categories = getAllCategories().filter(
    (category) => category.tipo === watchType.toUpperCase(),
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Transacción</DialogTitle>
          <DialogDescription>
            Registra un nuevo ingreso o gasto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {/* Type */}
                <TransactionsTypeFormField form={form} uniqueId={uniqueId} />

                {/* Descripcion */}
                <TransactionsFormField
                  form={form}
                  label="Descripción"
                  name="descripcion"
                  placeholder="Ej: Supermercado, Salario, etc.."
                />

                {/* Monto */}
                <FormField
                  control={form.control}
                  name="monto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          step={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={category.id_categoria}
                              value={category.nombre}
                            >
                              {category.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  handleOpenDialog(false);
                  form.reset();
                }}
              >
                Cancelar
              </Button>
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
