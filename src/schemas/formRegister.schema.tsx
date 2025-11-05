import z from 'zod';

export const formRegisterSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .nonempty('El nombre es requerido'),
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(30, 'El nombre de usuario no puede exceder los 30 caracteres')
    .nonempty('El nombre de usuario es requerido'),
  email: z.email('El email no es válido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no puede exceder los 20 caracteres')
    .nonempty('La contraseña es requerida'),
});
