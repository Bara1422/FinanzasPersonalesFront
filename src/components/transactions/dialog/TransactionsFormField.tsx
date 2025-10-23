import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import type { TransactionsDialogFormData } from './TransactionsDialog';

interface Props {
  form: UseFormReturn<TransactionsDialogFormData>;
  placeholder: string;
  label: string;
  name: keyof TransactionsDialogFormData;
}

export const TransactionsFormField = ({
  form,
  placeholder,
  label,
  name,
}: Props) => {
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
