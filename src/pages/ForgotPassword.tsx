import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Mail } from 'lucide-react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import type z from 'zod';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { apiAxios } from '@/config/axios';
import AuthLayout from '@/features/auth/components/AuthLayout';
import { formForgotPasswordSchema } from '@/schemas/formForgotPassword.schema';

type ForgotFormData = z.infer<typeof formForgotPasswordSchema>;

export const ForgotPassword = () => {
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage(null);

    try {
      const response = await apiAxios.post('/auth/forgot-password', data);
      const { message } = response.data;
      setSuccessMessage(
        message ||
          'Si el correo está registrado, enviamos un enlace para restablecer la contraseña',
      );
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'No se pudo generar el enlace';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Recuperar contraseña">
      <CardContent className="space-y-6">
        <form
          id={`${uniqueId}-forgot`}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="email"
              label="Email"
              type="email"
              placeholder="tuemail@example.com"
            />
          </FieldGroup>
        </form>

        {successMessage && (
          <Alert>
            <Mail />
            <AlertTitle>Solicitud recibida</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="p-6">
        <Button
          className="w-full cursor-pointer"
          type="submit"
          form={`${uniqueId}-forgot`}
          disabled={isLoading}
        >
          Enviar enlace
        </Button>
      </CardFooter>

      <p className="text-sm text-center text-muted-foreground">
        ¿Recordaste tu contraseña?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </AuthLayout>
  );
};
