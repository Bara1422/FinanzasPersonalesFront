import z from 'zod';

export const formResetPasswordSchema = z.object({
  token: z.string().min(1, 'El token es requerido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no puede superar los 20 caracteres'),
});
