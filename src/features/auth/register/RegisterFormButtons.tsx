import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

interface Props {
  isLoading: boolean;
  uniqueId: string;
  label: string;
  error: string;
}

export const RegisterFormButtons = ({
  isLoading,
  uniqueId,
  label,
  error,
}: Props) => {
  return (
    <div className="space-y-3 w-full">
      <Field orientation="horizontal">
        <Button
          className="flex w-full"
          type="submit"
          form={`${uniqueId}-register`}
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : label}
        </Button>
      </Field>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
