import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { formSchema } from '@/schemas/formUserEdit.schema';
import { useAuthStore } from '@/store/authStore';
import { FieldFormController } from '../../components/forms/FieldFormController';
import { UserFormButtons } from '../../components/forms/UserFormButtons';
import { CardContent, CardFooter } from '../../components/ui/card';
import { FieldGroup } from '../../components/ui/field';
import { useUserUpdate } from './hooks/useUser';

export type FormData = z.infer<typeof formSchema>;

export const UserFormData = () => {
  const uniqueId = useId();
  const user = useAuthStore((state) => state.usuario);
  const { mutate: updateUser, isPending } = useUserUpdate();

  const [isEditting, setIsEditting] = useState(false);

  const onSubmit = async (data: FormData) => {
    updateUser(data, {
      onSuccess: () => {
        toast.success('Perfil actualizado con éxito');
      },
      onError: () => {
        toast.error('Error al actualizar el perfil');
      },
    });

    setIsEditting(false);
  };

  const onChangeEditting = () => {
    setIsEditting(!isEditting);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: user?.nombre,
      email: user?.email,
      username: user?.username,
    },
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CardContent className="space-y-4">
        <form id={`${uniqueId}-form`} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nombre */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="nombre"
              label="Nombre Completo"
              isEditting={isEditting}
            />

            {/* Email */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="email"
              label="Email"
              isEditting={isEditting}
            />

            {/* Username */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              name="username"
              label="Nombre de Usuario"
              isEditting={isEditting}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <UserFormButtons
          onChangeEditting={onChangeEditting}
          isEditting={isEditting}
          form={form}
          uniqueId={uniqueId}
          isLoading={isPending}
        />
      </CardFooter>
    </>
  );
};
