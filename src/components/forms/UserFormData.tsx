import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { sleep } from '@/lib/sleep';
import type { User } from '@/mocks/user.mock';
import { formSchema } from '@/schemas/form.schema';
import { CardContent, CardFooter } from '../ui/card';
import { FieldGroup } from '../ui/field';
import { FieldFormController } from './FieldFormController';
import { UserFormButtons } from './UserFormButtons';

export type FormData = z.infer<typeof formSchema>;

export const UserFormData = ({ mockUser }: { mockUser: User }) => {
  const uniqueId = useId();
  const [isEditting, setIsEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await sleep(500);
    try {
      /* TODO: pegar a la api */
      toast.success('Perfil actualizado con éxito');
      console.log('Form Data:', data);
    } catch {
      toast.error('Error al actualizar el perfil');
    }
    setIsLoading(false);
    setIsEditting(false);
  };

  const onChangeEditting = () => {
    setIsEditting(!isEditting);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: mockUser.nombre,
      email: mockUser.email,
      username: mockUser.username,
    },
  });

  return (
    <>
      <CardContent className="space-y-4">
        <form id={`${uniqueId}-form`} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nombre */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              fieldName="nombre"
              fieldContentName="Nombre Completo"
              isEditting={isEditting}
            />

            {/* Email */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              fieldName="email"
              fieldContentName="Email"
              isEditting={isEditting}
            />

            {/* Username */}
            <FieldFormController
              form={form}
              uniqueId={uniqueId}
              fieldName="username"
              fieldContentName="Nombre de Usuario"
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
          isLoading={isLoading}
        />
      </CardFooter>
    </>
  );
};
