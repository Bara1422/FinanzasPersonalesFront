import z from 'zod';

export const formLoginSchema = z.object({
  email: z.email('El email no es válido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20)
    .nonempty('La contraseña es requerida'),
});
