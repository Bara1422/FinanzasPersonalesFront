import { FormLabel } from '../../ui/form';
import { RadioGroupItem } from '../../ui/radio-group';

interface Props {
  uniqueId: string;
  name: string;
  label: string;
  color: string;
}

export const TransactionsTypeOptionField = ({
  uniqueId,
  name,
  label,
  color,
}: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={name} id={`${uniqueId}-${name}`} />
      <FormLabel
        htmlFor={`${uniqueId}-${name}`}
        className={`text-${color} font-semibold`}
      >
        {label}
      </FormLabel>
    </div>
  );
};
