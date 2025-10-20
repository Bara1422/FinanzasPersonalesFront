import { Controller, type UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import type { FormData } from './UserFormData';

interface Props {
  form: UseFormReturn<FormData>;
  uniqueId: string;
  fieldName: keyof FormData;
  fieldContentName: string;
  isEditting: boolean;
}

export const FieldFormController = ({
  form,
  uniqueId,
  fieldName,
  fieldContentName,
  isEditting,
}: Props) => {
  return (
    <Controller
      control={form.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${uniqueId}-${fieldName}`}>
            {fieldContentName}
          </FieldLabel>
          <Input
            {...field}
            id={`${uniqueId}-${fieldName}`}
            aria-invalid={fieldState.invalid}
            disabled={!isEditting}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
