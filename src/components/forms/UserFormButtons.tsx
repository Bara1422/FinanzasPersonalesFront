import { Loader2, Save } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../../features/account/UserFormData';
import { Button } from '../ui/button';
import { Field } from '../ui/field';

interface Props {
  isEditting: boolean;
  onChangeEditting: () => void;
  form: UseFormReturn<FormData>;
  uniqueId: string;
  isLoading: boolean;
}

export const UserFormButtons = ({
  isEditting,
  onChangeEditting,
  form,
  uniqueId,
  isLoading,
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

          <Button type="submit" form={`${uniqueId}-form`} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </>
      ) : (
        <Button onClick={onChangeEditting}>Editar Perfil</Button>
      )}
    </Field>
  );
};
