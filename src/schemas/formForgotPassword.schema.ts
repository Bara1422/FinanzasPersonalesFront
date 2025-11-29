import z from 'zod';

export const formForgotPasswordSchema = z.object({
  email: z.email('El email no es válido'),
});
