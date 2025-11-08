import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { formRegisterSchema } from '@/schemas/formRegister.schema';
import { useAuthStore } from '@/store/authStore';
import { RegisterFormButtons } from './RegisterFormButtons';

export type RegisterFormData = z.infer<typeof formRegisterSchema>;

export const RegisterFormData = () => {
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      nombre: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await register({
        nombre: data.nombre,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Error registering:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardContent className="space-y-6">
        <form
          id={`${uniqueId}-register`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* Nombre completo */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="nombre"
              label="Nombre Completo"
              placeholder="Juan Pérez"
            />

            {/* Username */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="username"
              label="Nombre de Usuario"
              placeholder="juanperez"
            />

            {/* Email */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="email"
              label="Email"
              placeholder="juan@example.com"
            />

            {/* Password */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="p-6">
        <RegisterFormButtons
          error={error}
          isLoading={isLoading}
          uniqueId={uniqueId}
          label="Crear Cuenta"
        />
      </CardFooter>
    </>
  );
};
