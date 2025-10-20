import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsEditting(false);
    /* TODO: pegar a la api */
    console.log('Form Data:', data);
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
        />
      </CardFooter>
    </>
  );
};
