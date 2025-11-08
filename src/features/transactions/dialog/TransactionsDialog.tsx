import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { FieldFormControllerSelect } from '@/components/forms/FieldFormControllerSelect';
import { FormDialogHeader } from '@/components/forms/FormHeader';
import { useCategories } from '@/features/categories/hooks/useCategories';
import type { Transaction } from '@/mocks/transaccion.mock';
import { formNewTransactionSchema } from '@/schemas/formNewTransaction.schema';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '../../../components/ui/dialog';
import {
  useTransactionById,
  useTransactionCreate,
  useTransactionUpdate,
} from '../hooks/useTransactions';
import { TransactionsTypeFormField } from './components/TransactionsTypeFormField';

interface Props {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  transaction?: Transaction;
}

export type TransactionsDialogFormData = z.infer<
  typeof formNewTransactionSchema
>;

export const TransactionsDialog = ({
  open,
  handleOpenDialog,
  transaction,
}: Props) => {
  const uniqueId = useId();

  const isEditing = !!transaction;
  const { mutate: transactionCreate, isPending: isTransactionPending } =
    useTransactionCreate();
  const { data: transactionData } = useTransactionById(
    transaction?.id_transaccion,
  );
  const { data: categoriesData } = useCategories();
  const { mutate: transactionUpdate } = useTransactionUpdate();
  const isEditMode = !!transactionData;
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
    if (!categoriesData) return [];
    return categoriesData.filter(
      (category) => category.tipo === watchType.toUpperCase(),
    );
  }, [categoriesData, watchType]);

  useEffect(() => {
    if (!open) return;

    /* Si no hay categoría válida, selecciona la primera automáticamente */
    if (categoriesFiltered.length > 0) {
      form.setValue('id_categoria', categoriesFiltered[0].id_categoria);
    }
  }, [open, categoriesFiltered, form]);

  /* Manejar modo edición */
  useEffect(() => {
    if (transaction) {
      const category = categoriesData.find(
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
        id_categoria: 11,
      });
    }
  }, [open, form, transaction, categoriesData]);

  const onSubmit = async (data: TransactionsDialogFormData) => {
    if (isEditing && transaction) {
      transactionUpdate(
        { ...transaction, ...data },
        {
          onSuccess: () => {
            toast.success('Transacción actualizada con éxito');
          },
          onError: () => {
            toast.error('Error al actualizar la transacción');
          },
        },
      );
    } else {
      transactionCreate(data, {
        onSuccess: () => {
          toast.success('Transacción creada con éxito');
          form.reset();
        },
        onError: () => {
          toast.error('Error al crear la transacción');
        },
      });
    }

    handleOpenDialog(false);
    form.reset();
  };

  console.log(transaction);

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
              disabled={isTransactionPending}
            >
              {isEditMode ? 'Actualizar' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
