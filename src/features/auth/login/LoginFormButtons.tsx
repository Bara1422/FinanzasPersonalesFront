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

export const LoginFormButtons = ({
  isLoading,
  uniqueId,
  label,
  error,
}: Props) => {
  return (
    <div className="space-y-3  w-full">
      <Field orientation="horizontal">
        <Button
          className="w-full"
          type="submit"
          form={`${uniqueId}-login`}
          variant="default"
          disabled={isLoading}
        >
          {label}
        </Button>
      </Field>

      {error && (
        <Alert variant="destructive" className="flex justify-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription className="text-center">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
