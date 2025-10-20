import { Save } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Field } from '../ui/field';
import type { FormData } from './UserFormData';

interface Props {
  isEditting: boolean;
  onChangeEditting: () => void;
  form: UseFormReturn<FormData>;
  uniqueId: string;
}

export const UserFormButtons = ({
  isEditting,
  onChangeEditting,
  form,
  uniqueId,
}: Props) => {
  return (
    <Field orientation="horizontal">
      {isEditting ? (
        <>
          <Button
            type="button"
            onClick={() => {
              form.reset();
              onChangeEditting();
            }}
            variant={'outline'}
          >
            Cancelar
          </Button>
          <Button type="submit" form={`${uniqueId}-form`}>
            <Save className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>
        </>
      ) : (
        <Button onClick={onChangeEditting}>Editar Perfil</Button>
      )}
    </Field>
  );
};
