import { z } from 'zod';

export const formSchema = z.object({
  nombre: z
    .string()
    .min(4, 'El nombre completo debe tener al menos 4 caracteres'),
  email: z.email('El email no es válido'),
  username: z
    .string()
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres'),
});
