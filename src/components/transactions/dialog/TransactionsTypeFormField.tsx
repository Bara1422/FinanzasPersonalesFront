import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { RadioGroup } from '../../ui/radio-group';
import type { TransactionsDialogFormData } from './TransactionsDialog';
import { TransactionsTypeOptionField } from './TransactionsTypeOptionField';

interface Props {
  form: UseFormReturn<TransactionsDialogFormData>;
  uniqueId: string;
}

export const TransactionsTypeFormField = ({ form, uniqueId }: Props) => {
  return (
    <FormField
      control={form.control}
      name="tipo"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Tipo de Transacción</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex gap-6"
            >
              <TransactionsTypeOptionField
                uniqueId={uniqueId}
                name="ingreso"
                label="Ingreso"
                color="chart-2"
              />
              <TransactionsTypeOptionField
                uniqueId={uniqueId}
                name="gasto"
                label="Gasto"
                color="destructive"
              />
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
