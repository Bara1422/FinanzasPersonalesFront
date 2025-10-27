import { Controller, type UseFormReturn } from 'react-hook-form';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { RadioGroup } from '../../../../components/ui/radio-group';
import type { TransactionsDialogFormData } from '../TransactionsDialog';
import { TransactionsTypeOptionField } from './TransactionsTypeOptionField';

interface Props {
  form: UseFormReturn<TransactionsDialogFormData>;
  uniqueId: string;
  name: keyof TransactionsDialogFormData;
  label: string;
  placeholder?: string;
  isEditting?: boolean;
  type?: 'text' | 'number' | 'date';
  min?: string;
}

export const TransactionsTypeFormField1 = ({
  form,
  uniqueId,
  name,
  placeholder,
  label,
  isEditting = true,
  type = 'text',
  min = '',
}: Props) => {
  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-2">
            <FieldContent>
              <FieldLabel htmlFor={`${uniqueId}-${name}`}>{label}</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value.toString()}
              name={field.name}
              aria-invalid={fieldState.invalid}
              className="flex gap-6"
            >
              <TransactionsTypeOptionField
                uniqueId={uniqueId}
                name="INGRESO"
                label="Ingreso"
                color="green-500"
              />
              <TransactionsTypeOptionField
                uniqueId={uniqueId}
                name="GASTO"
                label="Gasto"
                color="destructive"
              />
            </RadioGroup>
          </Field>
        )}
      />
    </FieldGroup>
  );
};
