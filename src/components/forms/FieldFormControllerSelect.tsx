import { SelectValue } from '@radix-ui/react-select';
import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';
import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  uniqueId: string;
  name: Path<T>;
  label: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  valueIsNumber?: boolean;
}

export const FieldFormControllerSelect = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  uniqueId,
  valueIsNumber = false,
}: Props<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          orientation="vertical"
          className="min-w-[120px]"
          data-invalid={fieldState.invalid}
        >
          <FieldContent>
            <FieldLabel htmlFor={`${uniqueId}-${name}`}>{label}</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Select
            name={`${uniqueId}-${name}`}
            onValueChange={(value) => {
              const val = valueIsNumber ? Number(value) : value;
              field.onChange(val);
            }}
            value={field.value?.toString()}
          >
            <SelectTrigger
              id={`${uniqueId}-${name}`}
              aria-invalid={fieldState.invalid}
              className="min-w-[120px]"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
