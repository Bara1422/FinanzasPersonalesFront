import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { FormDialogHeader } from '@/components/forms/FormHeader';
import { FormLabelField } from '@/components/forms/FormLabelField';
import { getAllCategories } from '@/lib/getAllCategories';
import { sleep } from '@/lib/sleep';
import type { Transaction } from '@/mocks/transaccion.mock';
import { formNewTransactionSchema } from '@/schemas/formNewTransaction.schema';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '../../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { TransactionsTypeFormField } from './components/TransactionsTypeFormField';

interface Props {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  transaction?: Transaction;
  onSave: (transaction: Transaction) => void;
}

export type TransactionsDialogFormData = z.infer<
  typeof formNewTransactionSchema
>;

export const TransactionsDialog = ({
  open,
  handleOpenDialog,
  transaction,
  onSave,
}: Props) => {
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!transaction;

  const form = useForm<TransactionsDialogFormData>({
    resolver: zodResolver(formNewTransactionSchema),
    defaultValues: {
      descripcion: '',
      monto: 0,
      categoria: '',
      tipo: 'INGRESO',
    },
  });

  useEffect(() => {
    if (open && transaction) {
      const category = getAllCategories().find(
        (cat) => cat.id_categoria === transaction.id_categoria,
      );

      form.reset({
        tipo: category ? category.tipo : 'INGRESO',
        descripcion: transaction.descripcion,
        monto: transaction.monto,
        categoria: category ? category.nombre : '',
      });
    } else if (open && !transaction) {
      form.reset({
        tipo: 'INGRESO',
        descripcion: '',
        monto: 0,
        categoria: '',
      });
    }
  }, [open, transaction, form]);

  const onSubmit = async (data: TransactionsDialogFormData) => {
    setIsLoading(true);
    await sleep(500);

    const selectedCategory = getAllCategories().find(
      (cat) => cat.nombre === data.categoria,
    );

    let savedTransaction: Transaction;

    if (isEditMode) {
      savedTransaction = {
        ...transaction,
        id_categoria: Number(selectedCategory?.id_categoria),
        descripcion: data.descripcion,
        monto: Number(data.monto),
      };
      toast.success('Transacción actualizada con éxito');
    } else {
      savedTransaction = {
        id_transaccion: Date.now(),
        id_usuario: 1,
        id_categoria: Number(selectedCategory?.id_categoria),
        descripcion: data.descripcion,
        monto: Number(data.monto),
        fecha: new Date().toISOString(),
      };
      toast.success('Transacción creada con éxito');
    }
    console.log('Transaccion', savedTransaction);
    onSave(savedTransaction);
    setIsLoading(false);
    handleOpenDialog(false);
    form.reset();
  };

  const watchType = form.watch('tipo');

  const categories = getAllCategories().filter(
    (category) => category.tipo === watchType.toUpperCase(),
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <FormDialogHeader
          title="Nueva Transacción"
          description="Registra un nuevo ingreso o gasto."
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {/* Type */}
                <TransactionsTypeFormField form={form} uniqueId={uniqueId} />

                {/* Descripcion */}
                <FormLabelField
                  form={form}
                  label="Descripción"
                  name="descripcion"
                  placeholder="Ej: Supermercado, Salario, etc.."
                />

                {/* Monto */}
                <FormLabelField
                  form={form}
                  name="monto"
                  label="Monto"
                  placeholder="1200"
                  type="number"
                />

                {/* Category */}
                {/* TODO: usar form para selects */}
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
              {/* TODO: ver si se puede reutilizar */}
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
                {isEditMode ? 'Actualizar' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
