import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { FieldFormControllerSelect } from '@/components/forms/FieldFormControllerSelect';
import { FormDialogHeader } from '@/components/forms/FormHeader';
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
  const categories = getAllCategories();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!transaction;
  const form = useForm<TransactionsDialogFormData>({
    resolver: zodResolver(formNewTransactionSchema),
    defaultValues: {
      descripcion: '',
      monto: 0,
      id_categoria: 0,
      tipo: 'INGRESO',
    },
  });
  const watchType = form.watch('tipo');

  const categoriesFiltered = useMemo(() => {
    return categories.filter(
      (category) => category.tipo === watchType.toUpperCase(),
    );
  }, [categories, watchType]);

  useEffect(() => {
    if (!open) return;

    const currentCat = form.getValues('id_categoria');
    const existsInFiltered = categoriesFiltered.some(
      (cat) => cat.id_categoria === currentCat,
    );

    /* Si no hay categoría válida, selecciona la primera automáticamente */
    if (!existsInFiltered && categoriesFiltered.length > 0) {
      form.setValue('id_categoria', categoriesFiltered[0].id_categoria);
    }
  }, [open, categoriesFiltered, form]);

  /* Manejar modo edición */
  useEffect(() => {
    if (open && transaction) {
      const category = getAllCategories().find(
        (cat) => cat.id_categoria === transaction.id_categoria,
      );

      form.reset({
        tipo: category ? category.tipo : 'INGRESO',
        descripcion: transaction.descripcion,
        monto: transaction.monto,
        id_categoria: transaction.id_categoria,
      });
    } else if (open && !transaction) {
      form.reset({
        tipo: 'INGRESO',
        descripcion: '',
        monto: 0,
      });
    }
  }, [open, transaction, form]);

  const onSubmit = async (data: TransactionsDialogFormData) => {
    setIsLoading(true);
    await sleep(500);

    let savedTransaction: Transaction;

    if (isEditMode) {
      savedTransaction = {
        ...transaction,
        descripcion: data.descripcion,
        id_categoria: data.id_categoria,
        monto: Number(data.monto),
      };
      toast.success('Transacción actualizada con éxito');
    } else {
      savedTransaction = {
        id_transaccion: Math.floor(Math.random() * 10000),
        id_usuario: 1,
        id_categoria: data.id_categoria,
        descripcion: data.descripcion,
        monto: Number(data.monto),
        fecha: new Date().toISOString(),
      };
      toast.success('Transacción creada con éxito');
    }

    onSave(savedTransaction);
    setIsLoading(false);
    handleOpenDialog(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <FormDialogHeader
          title="Nueva Transacción"
          description="Registra un nuevo ingreso o gasto."
        />

        <form
          id={`${uniqueId}-transactions-form`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              {/* Type */}
              <TransactionsTypeFormField
                form={form}
                uniqueId={uniqueId}
                label="Tipo de Transacción"
                name="tipo"
              />

              {/* Descripcion */}
              <FieldFormController
                form={form}
                uniqueId={uniqueId}
                label="Descripción"
                name="descripcion"
                placeholder="Ej: Supermercado, Salario, etc"
              />

              {/* Monto */}
              <FieldFormController
                form={form}
                uniqueId={uniqueId}
                label="Monto"
                name="monto"
                placeholder="12000"
                type="number"
              />
              {/* Category */}
              <FieldFormControllerSelect
                form={form}
                label="Categoría"
                name="id_categoria"
                uniqueId={uniqueId}
                placeholder="Selecciona una categoría"
                valueIsNumber={true}
                options={categoriesFiltered.map((category) => ({
                  label: category.nombre,
                  value: category.id_categoria,
                }))}
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
      </DialogContent>
    </Dialog>
  );
};
