import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import type z from 'zod';
import { apiAxios } from '@/config/axios';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import AuthLayout from '@/features/auth/components/AuthLayout';
import { formResetPasswordSchema } from '@/schemas/formResetPassword.schema';

type ResetFormData = z.infer<typeof formResetPasswordSchema>;

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const uniqueId = useId();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultToken = searchParams.get('token') || '';

  const form = useForm<ResetFormData>({
    resolver: zodResolver(formResetPasswordSchema),
    defaultValues: {
      token: defaultToken,
      password: '',
    },
  });

  const onSubmit = async (data: ResetFormData) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await apiAxios.post('/auth/reset-password', data);
      setSuccess('Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
      toast.success('Contraseña restablecida');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'No se pudo actualizar la contraseña';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Restablecer contraseña">
      <CardContent className="space-y-6">
        <form
          id={`${uniqueId}-reset`}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="token"
              label="Token"
              placeholder="Pega el token recibido por email"
            />

            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="password"
              label="Nueva contraseña"
              type="password"
              placeholder="••••••••"
            />
          </FieldGroup>
        </form>

        {success && (
          <Alert>
            <ShieldCheck />
            <AlertTitle>Listo</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
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
          className="w-full"
          type="submit"
          form={`${uniqueId}-reset`}
          disabled={isLoading}
        >
          Guardar nueva contraseña
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
