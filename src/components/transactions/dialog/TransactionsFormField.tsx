import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';


interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder: string;
  label: string;
  name: Path<T>;
}

export const TransactionsFormField = <T extends FieldValues>({
  form,
  placeholder,
  label,
  name,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
