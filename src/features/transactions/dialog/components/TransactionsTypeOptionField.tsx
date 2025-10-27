import { FieldLabel } from '@/components/ui/field';
import { RadioGroupItem } from '../../../../components/ui/radio-group';

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
      <FieldLabel
        htmlFor={`${uniqueId}-${name}`}
        className={`text-${color} font-semibold`}
      >
        {label}
      </FieldLabel>
    </div>
  );
};
