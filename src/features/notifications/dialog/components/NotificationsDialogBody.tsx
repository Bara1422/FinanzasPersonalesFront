import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { FieldFormControllerSelect } from '@/components/forms/FieldFormControllerSelect';
import { FieldGroup } from '@/components/ui/field';
import { formDateForInput } from '@/lib/formDateForInput';
import type { Category } from '@/types/category.types';
import type { NotificationsDialogFormData } from '../NotificationsDialog';

interface Props {
  form: UseFormReturn<NotificationsDialogFormData>;
  uniqueId: string;
  categories: Category[];
}

export const NotificationsDialogBody = ({
  form,
  uniqueId,
  categories,
}: Props) => {
  // usememo para memoizar el filtro
  const categoriesFiltered = useMemo(() => {
    return categories
      .filter((category) => category.tipo === 'GASTO')
      .map((cat) => ({
        label: cat.nombre,
        value: cat.id_categoria,
      }));
  }, [categories]);

  const Priorities = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Media', value: 'MEDIA' },
    { label: 'Baja', value: 'BAJA' },
  ];

  return (
    <div className="grid gap-4 py-4">
      <FieldGroup className="space-y-4">
        {/* Message */}
        <FieldFormController
          form={form}
          label="Mensaje"
          name="descripcion"
          placeholder="Ej: Pago de alquiler, Cuota del gimnasio..."
          uniqueId={uniqueId}
        />

        {/* Amount */}
        <FieldFormController
          form={form}
          label="Monto"
          name="monto"
          uniqueId={uniqueId}
          placeholder="1200"
          type="number"
        />

        {/* Category */}
        <FieldFormControllerSelect
          form={form}
          label="Categoría"
          name="id_categoria"
          uniqueId={uniqueId}
          options={categoriesFiltered}
          valueIsNumber={true}
        />

        {/* Priority */}
        <FieldFormControllerSelect
          form={form}
          label="Selecciona una prioridad"
          name="prioridad"
          uniqueId={uniqueId}
          options={Priorities}
          valueIsNumber={false}
        />

        {/* Expiration date */}
        <FieldFormController
          form={form}
          label="Fecha de Vencimiento"
          name="fecha_vencimiento"
          uniqueId={uniqueId}
          type="date"
          min={formDateForInput(new Date().toISOString())}
        />
      </FieldGroup>
    </div>
  );
};
