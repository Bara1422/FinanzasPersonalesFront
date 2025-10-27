import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  uniqueId: string;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isEditting?: boolean;
  type?: 'text' | 'number' | 'date';
  min?: string;
}

export const FieldFormController = <T extends FieldValues>({
  form,
  uniqueId,
  name,
  placeholder,
  label,
  isEditting = true,
  type = 'text',
  min = '',
}: Props<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${uniqueId}-${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            id={`${uniqueId}-${name}`}
            aria-invalid={fieldState.invalid}
            disabled={!isEditting}
            min={min}
            onChange={(e) => {
              const value =
                type === 'number' ? Number(e.target.value) : e.target.value;
              field.onChange(value);
            }}
            value={type === 'number' && field.value === 0 ? '' : field.value}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
