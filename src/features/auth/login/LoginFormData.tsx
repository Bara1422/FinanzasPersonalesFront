import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { formLoginSchema } from '@/schemas/formLogin.schema';
import { useAuthStore } from '@/store/authStore';
import { LoginFormButtons } from './LoginFormButtons';

export type LoginFormData = z.infer<typeof formLoginSchema>;

export const LoginFormData = () => {
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await login(data.email, data.password);

      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Error logging in:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <CardContent className="space-y-6">
        <form id={`${uniqueId}-login`} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="email"
              label="Email"
            />
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="password"
              label="Contraseña"
              type="password"
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="p-6">
        <LoginFormButtons
          error={error}
          isLoading={isLoading}
          uniqueId={uniqueId}
          label="Ingresar"
        />
      </CardFooter>
    </>
  );
};
