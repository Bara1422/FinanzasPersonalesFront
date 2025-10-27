import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  min?: string;
  type?: 'text' | 'number' | 'date';
}

export const FormLabelField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = '',
  type = 'text',
  min = '',
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                const value =
                  type === 'number' ? Number(e.target.value) : e.target.value;
                field.onChange(value);
              }}
              min={min}
              value={type === 'number' && field.value === 0 ? '' : field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
